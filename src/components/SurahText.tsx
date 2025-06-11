import { Link, useParams, useSearchParams } from "react-router"
import { Surah, } from "../types/quranSurahs";
import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import settings from "../assets/settings.svg"
import { AnimatePresence, motion, } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import { Theme, themeType } from "../types/theme";
import { Button } from "./ui/button";
import { quran } from "@/constants/quran"
import tafsirat, { TafsirItem } from "@/constants/tafsirs"
import { S } from "../constants/quran"
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import FormSearchAyahs from "./FormSearchAyahs";
import { Separator } from "./ui/separator";
import Sajda from "@/assets/images/bismillah.png"
import FilterPopupWrapper from "./FilterPopupWrapper";
import TafsirPopup from "./TafsirPopup";
import { getPerPage } from "@/utils/getQuranPerPage";
import HoriznotelStyle from "./HoriznotelStyle";
import AyahtsSounds from "./AyahtsSounds";
type TafserItem = Pick<TafsirItem, "ayah_url" | "text">
const SurahText = () => {
    const { theme } = useContext<Theme>(ThemeContext)
    const [fontSize, setFontSize] = useState(() => +localStorage.getItem("font_size") || 18)
    let { id: surahName } = useParams<number>()
    const [scrollSpeed,] = useState<() => undefined | number>((): number => +localStorage.getItem("scrolling_speed") / 10)
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
    const tafsirSurah = useMemo<string[]>(() => tafsirat.reduce((el, acc) => el.concat(acc), []).map((el: TafserItem) => [el?.ayah_url?.slice(1), el?.text]).filter((el: string[]) => el[0]?.split("/")[1] === surahName), [surahName]).sort((el, el2) => +el[0].split('/')[2] - +el2[0].split('/')[2])
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [searchedAyah, setSearchedAyah] = useState<string>("");
    const [filterdAyah, setFilterdAyah] = useState<Surah[] | undefined>(undefined);
    const [isTafsirOpen, setIsTafsirOpen] = useState<boolean>(false);
    const suraah = useMemo<S>(() => quran[surahName - 1], [surahName])
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
            setCurrentAyah(+getAyah.get("ayah"))
        }
        return () => clearInterval(myInterval)
    }, [bodyHeight, isAutoScrolling,]);
    useEffect(() => {
        window.scroll({ top: 0, behavior: "instant" })
    }, [suraah])
    useEffect(() => {
        localStorage.setItem("font_size", `${fontSize}`)
    }, [fontSize])
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
    const [tafsirAyahNumber, tafsirAyahContent] = [tafsirSurah.map((el) => el[0].split('/')[2]), tafsirSurah.map((el) => el[1])]
    const [isSoundsMode, setIsSoundsMode] = useSearchParams({})
    return (
        <>
            {/* <AyahtsSounds /> */}
            <AnimatePresence>
                {isTafsirOpen &&
                    <TafsirPopup setIsTafsirOpen={setIsTafsirOpen} tafsirSurahAyahs={tafsirAyahNumber} tafsirSurah={tafsirAyahContent} />
                }
            </AnimatePresence>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <div onClick={() => setShowSettings(!showSettings)} className={`fixed transition-all duration-700 ${!showSettings ? "bottom-[20px]" : "bottom-[100px]"} right-4 bg-white p-[10px] rounded-lg border-solid border-[#000] border-2 cursor-pointer z-[9999999999]`}>
                    <img src={settings} className="size-[20px]" alt="" />
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
                    <FilterPopupWrapper>
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                {filterdAyah?.length ?
                                    ` 
                                    تم العثور علي
                                    ${replaceNumsEnglishToArabic(filterdAyah?.length + "")}
                                    نتائج ( ${searchedAyah} )
                                `
                                    : "لم يتم العثور علي نتائج"}
                            </div>
                            <Button variant={"default"} onClick={() => setSearchedAyah("")}>رجوع</Button>
                        </div>
                        <Separator />
                        <section className="flex flex-col gap-2 pt-5">
                            {filterdAyah?.map(a => (
                                <div onClick={() => handelSelectAyah(a.numberInSurah + "")} className="flex gap-2 text-foreground cursor-pointer" key={a.text + Math.random() + "abcde"}>
                                    <span style={{ fontSize: fontSize }} className="size-[30px] rounded-[50%] p-2 text-green-500 border-solid border-2 border-green-400 inline-flex items-center justify-center !text-[14px]">{replaceNumsEnglishToArabic(a?.numberInSurah?.toString())}</span>
                                    {a.text}
                                </div>
                            ))}
                        </section>
                    </FilterPopupWrapper>
                }
            </AnimatePresence>
            <div className="fixed w-[4px] bg-background left-1 pt-3 top-[70px] " style={{ height: `${barHeight}vh` }} />
            <AnimatePresence>
                {showSettings && !isTafsirOpen &&
                    <>
                        <motion.div
                            initial={{ marginBottom: -100 }}
                            animate={{ marginBottom: 0 }}
                            transition={{ duration: .7 }}
                            exit={{ marginBottom: -100 }}
                            className="fixed bottom-0 w-full left-0 flex items-center justify-between bg-[#FFF] p-2 border-t-solid border-t-black border-t-2 pt-4 z-[9999999999] ">
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
                                        <Link to={`/quran/by-surahs/${+surahName! < 114 ? `${+surahName! - 1}` : ""}`} className="max-sm:text-sm px-[15px] py-2 mx-2 bg-[#ddd] text-lg cursor-pointer rounded-lg border-solid border-[#000] border-2"> السورة السابقة</Link>
                                    </Button>
                                    {tafsirSurah.length &&
                                        <Button onClick={() => { setIsTafsirOpen(prev => !prev); setShowSettings(false) }} className="max-sm:text-sm px-[15px] py-2 mx-2 text-lg cursor-pointer rounded-lg border-solid border-[#000] border-2 ">
                                            اظهر التفسير
                                        </Button>
                                    }
                                    <Button asChild>
                                        <Link to={`/quran/by-surahs/${+surahName! < 114 ? `${+surahName! + 1}` : ""}`} className="max-sm:text-sm px-[15px] py-2 mx-2 bg-[#ddd] text-lg cursor-pointer rounded-lg border-solid border-[#000] border-2"> السورة التالية</Link>
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
                className="text-center z-[9] transition-all duration-700 py-2 pt-3 text-lg border-solid border-2 border-green-300 bg-white w-[90%] rounded-xl mx-auto mb-2 sticky top-[60px]"> {suraah!?.name}</div>
            <section ref={ref} className="mb-2 pb-[70px] px-[22px] text-center">
                <JuzItem font={fontSize} theme={theme} juzNum={replaceNumsEnglishToArabic(suraah?.ayahs[0].juz + "")} />
                {
                    suraah?.ayahs?.map(e => {
                        e.number = +(e.number + "")
                        return e
                    })?.map((ayah, idx, a) => {
                        return (
                            <>
                                <>
                                    <div data-juz={ayah.juz} onClick={() => {
                                        setCurrentAyah(+ayah.numberInSurah)
                                        localStorage.setItem("last_ayah", JSON.stringify({ surahName, ayahNumber: idx + 1 }))
                                    }} id={(idx + 1).toString()} style={{ fontSize }} className={`font-semibold cursor-pointer leading-[2] text-lg w-full inline ${currentAyah === +ayah.numberInSurah ? "text-red-500" : ""}`}>
                                        {+surahName! !== 9 && idx === 0 && !ayah?.text.includes("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ") ? ayah?.text.slice(38) : ayah.sajda ? ayah.text.slice(0, ayah.text.length - 1) : ayah.text}
                                        {ayah.sajda && <img src={Sajda} className="size-[35px] grayscale-[100%] " alt="" />}
                                        <span style={{ fontSize: fontSize }} className="size-[30px] rounded-[50%] p-2 text-green-500 mx-2 m-1 border-solid border-2 border-green-400 inline-flex items-center justify-center text-[18px]">   {replaceNumsEnglishToArabic(ayah?.numberInSurah?.toString())}</span>
                                    </div>
                                    {suraah.ayahs[idx]?.juz < suraah.ayahs[idx + 1]?.juz &&
                                        <JuzItem font={fontSize} juzNum={replaceNumsEnglishToArabic(String((ayah?.juz + 1)))} theme={theme} />
                                    }
                                    {suraah.ayahs[idx]?.page < suraah.ayahs[idx + 1]?.page &&
                                        <div className="py-4">
                                            <Separator />
                                            {/* <div className="flex justify-center items-center p-2 rounded-lg z-10 bg-secondary-foreground my-10"> */}
                                            <div className={`mx-auto flex items-center justify-center my-2 size-[40px] text-secondary-foreground text-xl p-3 sticky transition-all duration-700 top-[3px] bg-background text-center rounded-[50%] border-2 border-solid border-secondary-foreground`}>  {replaceNumsEnglishToArabic(ayah?.page + "")}</div>
                                            {/* </div> */}
                                            <Separator />
                                        </div>
                                    }
                                </>
                            </>
                        )
                    })
                }




                {surahName === "114" && <EndDuaa font={fontSize} />}
            </section >
        </>


    )
}
export function JuzItem({ juzNum, font, theme }: { font: number, juzNum: string, theme?: themeType }) {
    return (
        <div className={`block w-full mr-auto p-3 sticky transition-all duration-700 top-[3px] bg-white text-center rounded-lg border-2 border-solid border-black my-2 z-[2] text-black mt-1`}> الجزء {juzNum}</div>
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


export default memo(SurahText)