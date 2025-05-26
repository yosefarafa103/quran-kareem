import axios, { AxiosResponse } from "axios";
import { Link, useParams, useSearchParams } from "react-router"
import { Surah, SurahsAyahs, } from "../types/quranSurahs";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import settings from "../assets/settings.svg"
import { AnimatePresence, motion, } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import { Theme, themeType } from "../types/theme";
import { Button } from "./ui/button";
import { quran } from "@/constants/quran"
import { S } from "../constants/quran"
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import FormSearchAyahs from "./FormSearchAyahs";
import { Separator } from "./ui/separator";
const SurahText = () => {
    const { theme } = useContext<Theme>(ThemeContext)
    const [fontSize, setFontSize] = useState(18)
    let { id: surahName } = useParams()
    const getSurah = async () => {
        try {
            const data: AxiosResponse<Surah[]> = await axios.get(`https://alquran.vip/APIs/ayah?number=${surahName}`);
            return data?.data
        } catch (err) {
            throw new Error(err as any)
        }
    };
    const allAyahs = quran.map((e) => e.ayahs).reduce((a, e) => a.concat(e))
    const [scrollSpeed] = useState<() => null | string>((): null | string => localStorage.getItem("scrolling_speed"))
    const [getAyah] = useSearchParams({})
    const ref = useRef<HTMLElement | null>(null)
    const [currentAyah, setCurrentAyah] = useState<number | null>(getAyah.get("ayah") ? +getAyah.get("ayah")! : null)
    const [bodyHeight, setBodyHeight] = useState<number | null>(0)
    const [showSettings, setShowSettings] = useState<boolean | null>(false)
    const [barHeight, setBarHeight] = useState<number | null>(0)
    const [isAutoScrolling, setIsAutoScrolling] = useState<boolean | null>(false)
    const replaceNumsEnglishToArabic = useCallback((ayahNum: string) => {
        const numbers = [
            { arabic: "٠", english: "0" },
            { arabic: "١", english: "1" },
            { arabic: "٢", english: "2" },
            { arabic: "٣", english: "3" },
            { arabic: "٤", english: "4" },
            { arabic: "٥", english: "5" },
            { arabic: "٦", english: "6" },
            { arabic: "٧", english: "7" },
            { arabic: "٨", english: "8" },
            { arabic: "٩", english: "9" }
        ];
        return numbers.map((_) => ayahNum?.split("").map((ltr) => {
            const arabicItem = numbers.find((val) => val.english.includes(ltr))
            return ltr.replace(ltr, arabicItem!?.arabic)
        }).join(""))[0];
    }, []);
    const suraah = useMemo<S>(() => quran[+surahName - 1], [surahName])
    useEffect(() => {
        let myInterval: NodeJS.Timeout;
        if (isAutoScrolling) {
            myInterval = setInterval(() => {
                window.onscroll = () => {
                    if (scrollY === bodyHeight) {
                        return clearInterval(myInterval)
                    }
                }
                setBarHeight(window.scrollY / bodyHeight * 100)
                window.scrollBy({
                    top: 1,
                    behavior: "smooth"
                })
            }, +scrollSpeed! < 1 ? +scrollSpeed! * 1000 : +scrollSpeed! / 1000);

        }
        if (ref.current) {
            setBodyHeight(ref.current.clientHeight)
        }
        if (getAyah.get("ayah") && suraah) {
            setTimeout(() => {
                location.hash = `#${getAyah.get("ayah")}`
            }, 500);
        }
        return () => clearInterval(myInterval)
    }, [bodyHeight, isAutoScrolling,]);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [searchedAyah, setSearchedAyah] = useState<string>("");
    const [filterdAyah, setFilterdAyah] = useState<Surah[] | undefined>(undefined);
    useEffect(() => {
        window.scroll({ top: 0, behavior: "instant" })
    }, [])
    useEffect(() => {
        setFilterdAyah(suraah.ayahs.filter((a) => a.text.replace(/[\u064B-\u0652]/g, '').includes(searchedAyah)
        ))
    }, [searchedAyah])
    const handelSelectAyah = useCallback((ayahNum: string) => {
        setSearchedAyah("")
        setTimeout(() => {
            location.hash = ayahNum;
            setCurrentAyah(+ayahNum);
        }, 1000);
    }, [])

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <div onClick={() => setShowSettings(!showSettings)} className={`fixed transition-all duration-700 ${!showSettings ? "bottom-[20px]" : "bottom-[100px]"} right-4 bg-white p-[10px] rounded-lg border-solid border-[#000] border-2 cursor-pointer z-[999]`}>
                    <img src={settings} className="size-[20px] " alt="" />
                </div>
                <DialogTrigger>
                    <div className={`fixed size-[45px] transition-all duration-700 ${showSettings ? "bottom-[30px]" : "bottom-[80px]"} right-4 bg-background text-primary p-[10px] rounded-lg border-solid border-[#000] border-2 cursor-pointer flex items-center justify-center `}>
                        <Search />
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>
                        البحث عن اية معينه
                    </DialogTitle>
                    <FormSearchAyahs setSearchedAyah={setSearchedAyah} setOpen={setIsOpen} isOpen={isOpen} />
                </DialogContent>
            </Dialog>
            <AnimatePresence>
                {searchedAyah &&
                    <motion.section
                        className="bg-background fixed left-0 w-full h-screen z-10 p-4 overflow-scroll"
                        initial={{ top: "100%" }}
                        animate={{ top: "0%" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        exit={{ top: "100%" }}
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                {filterdAyah?.length ?
                                    ` 
                                    تم العثور علي
                                    ${replaceNumsEnglishToArabic(filterdAyah?.length + "")}  
                                    نتائج
                                `
                                    : "لم يتم العثور علي نتائج"}

                            </div>
                            <Button variant={"default"} onClick={() => setSearchedAyah("")}>رجوع</Button>
                        </div>
                        <Separator />
                        <section className="flex flex-col gap-2 pt-5">
                            {filterdAyah?.map(a => (
                                <div onClick={() => handelSelectAyah(a.numberInSurah + "")} className="flex gap-2 text-foreground cursor-pointer" key={a.text}>
                                    <span style={{ fontSize: fontSize }} className="size-[30px] rounded-[50%] p-2 text-green-500 border-solid border-2 border-green-400 inline-flex items-center justify-center !text-[14px]">{replaceNumsEnglishToArabic(a?.numberInSurah?.toString())}</span>
                                    {a.text}
                                </div>
                            ))}
                        </section>
                    </motion.section>
                }
            </AnimatePresence>
            <div className="fixed w-[4px] bg-background left-1 pt-3 top-[70px] " style={{ height: `${barHeight}vh` }} />
            <AnimatePresence>
                {showSettings &&
                    <>
                        <motion.div
                            initial={{ marginBottom: -100 }}
                            animate={{ marginBottom: 0 }}
                            transition={{ duration: .7 }}
                            exit={{ marginBottom: -100 }}
                            className="fixed bottom-0 w-full left-0 flex items-center justify-between bg-[#FFF] p-2 border-t-solid border-t-black border-t-2 pt-4">
                            <div className="flex justify-between items-center overflow-x-scroll whitespace-nowrap" >
                                <div>
                                    <Button onClick={() => {
                                        if (fontSize >= 18) {
                                            setFontSize(current => current -= 2)
                                        }
                                    }} className="max-sm:text-sm px-[15px] py-2 mx-2  text-lg cursor-pointer rounded-lg border-solid border-[#000] border-2">تصغير الخط</Button>
                                    <Button onClick={() => setFontSize(current => current += 2)} className="max-sm:text-sm px-[15px] py-2 mx-2 text-lg cursor-pointer rounded-lg border-solid border-[#000] border-2"> تكبير الخط</Button>
                                </div>
                                <div>
                                    <Button asChild>
                                        <Link to={`/quran/by-surahs/${+surahName! < 114 ? `${+surahName! - 1}` : ""}`} className="max-sm:text-sm px-[15px] py-2 mx-2 mb-3 bg-[#ddd] text-lg cursor-pointer rounded-lg border-solid border-[#000] border-2"> السورة السابقة</Link>
                                    </Button>
                                    <Button asChild>
                                        <Link to={`/quran/by-surahs/${+surahName! < 114 ? `${+surahName! + 1}` : ""}`} className="max-sm:text-sm px-[15px] py-2 mx-2 mb-3 bg-[#ddd] text-lg cursor-pointer rounded-lg border-solid border-[#000] border-2"> السورة التالية</Link>
                                    </Button>
                                </div>
                            </div>
                            <Button variant={"secondary"} onClick={() => setIsAutoScrolling(!isAutoScrolling)} className="max-sm:text-sm px-[15px] py-2 mx-2 mb-3 bg-background text-lg cursor-pointer rounded-lg border-solid border-[#000] border-2 absolute top-[-50px] left-2">تفعيل الانزلاق التلقائي</Button>
                        </motion.div>
                    </>
                }
            </AnimatePresence>
            <div
                style={{ backgroundColor: theme === "Dark" ? "#000" : "#eee" }}
                className="text-center transition-all duration-700 py-4 pt-5 text-xl border-solid border-2 border-green-300 bg-white mx-1 mb-4 sticky top-[70px]"> {suraah!?.name}</div>
            <section ref={ref} className="mb-2 pb-[70px] px-[22px] text-center">
                <JuzItem font={fontSize} theme={theme} juzNum={replaceNumsEnglishToArabic(suraah?.ayahs[0].juz + "")} />
                {
                    suraah?.ayahs?.map(e => {
                        e.number = +(e.number + "")
                        return e
                    })?.map((ayah, idx) => {
                        return (
                            <>
                                <div data-juz={ayah.juz} onClick={() => {
                                    setCurrentAyah(+ayah.numberInSurah)
                                    localStorage.setItem("last_ayah", JSON.stringify({ surahName, ayahNumber: idx + 1 }))
                                }} id={(idx + 1).toString()} style={{ fontSize }} className={`font-semibold cursor-pointer leading-[2.5] text-lg inline ${currentAyah === +ayah.numberInSurah ? "text-red-500" : ""}`}>
                                    {+surahName! !== 9 && idx === 0 && !ayah?.text.includes("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ") ? ayah?.text.slice(38) : ayah.text}
                                    <span style={{ fontSize: fontSize }} className="size-[40px] rounded-[50%] p-2 text-green-500 m-2 border-solid border-2 border-green-400 inline-flex items-center justify-center text-[18px]">{replaceNumsEnglishToArabic(ayah?.numberInSurah?.toString())}</span>
                                </div>
                                {suraah.ayahs[idx]?.juz < suraah.ayahs[idx + 1]?.juz &&
                                    <JuzItem font={fontSize} juzNum={replaceNumsEnglishToArabic(String((ayah?.juz + 1)))} theme={theme} />
                                }
                            </>
                        )
                    })
                }
                {surahName === "114" && <EndDuaa font={fontSize} />}
            </section>
        </>
    )
}
export function EndDuaa({ font, title }: { title?: string, font: number, }) {
    return (
        <>
            {title &&
                <h3>{title}</h3>
            }
            <section style={{ fontSize: font, }} className="p-3 border-r-solid border-r-green-300 bg-background border-r-[7px] leading-[1.5] rounded-lg mt-10 mb-5">
                اللهم اجعل القرآن العظيم ربيع قلبي، ونور صدري، وجلاء حزني، وذهاب همّي.
                اللهم علّمني منه ما جهلت، وذكّرني منه ما نُسّيت، وارزقني تلاوته آناء الليل وأطراف النهار، واجعله حجةً لي يا رب العالمين.
                اللهم اجعلني ممن يحلّ حلاله، ويحرّم حرامه، ويعمل بمحكمه، ويؤمن بمتشابهه.
                اللهم اجعل القرآن لنا في الدنيا قرينًا، وفي القبر مؤنسًا، وعلى الصراط نورًا، وفي الجنة رفيقًا، ومن النار ستراً وحجابًا.
                اللهم اجعلنا من أهل القرآن الذين هم أهلك وخاصتك، يا أرحم الراحمين.
                اللهم اجعل ختمتنا هذه ختمةً مباركة، واجعلها شاهدةً لنا لا علينا، وتقبّلها منا يا أكرم الأكرمين.
            </section>
        </>
    )
}
export function JuzItem({ juzNum, font, theme }: { font: number, juzNum: string, theme?: themeType }) {
    return (
        <div style={{ fontSize: font * 1.2, backgroundColor: theme === "Dark" ? "#000" : "#eee" }} className={`block w-full p-3 sticky transition-all duration-700 top-[3px] bg-white text-center rounded-lg border-2 border-solid border-black my-4 text-black z-[9] mt-1 ${theme === "Dark" && "text-white border-light"}`}> الجزء {juzNum}</div>
    )
}
export default SurahText