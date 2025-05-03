import axios, { AxiosResponse } from "axios";
import { Link, useParams, useSearchParams } from "react-router"
import { Surah, SurahsAyahs } from "../types/quranSurahs";
import { useFetchQuery } from "../hooks/useFetchQuery";
import data from "../data/quranSurahs.json"
import Loader from "./Loader";
import { useEffect, useRef, useState } from "react";
import settings from "../assets/settings.svg"
import { AnimatePresence, motion } from "framer-motion";
const SurahText = () => {
    const [fontSize, setFontSize] = useState(18)
    let { id: surahName } = useParams()
    const getSurah = async () => {
        try {
            const data: AxiosResponse<Surah[]> = await axios.get(`https://alquran.vip/APIs/ayah?number=${surahName}`);
            return data?.data
        } catch (err) {
            throw new Error(err as any)
        }
    }
    const [getAyah] = useSearchParams({})
    const ref = useRef<HTMLElement | null>(null)
    const { data: surah, isLoading } = useFetchQuery<SurahsAyahs[]>(getSurah, `Surah_Number_${surahName}`);
    const [currentAyah, setCurrentAyah] = useState<number | null>(getAyah.get("ayah") ? +getAyah.get("ayah")! : null)
    const [bodyHeight, setBodyHeight] = useState<number | null>(0)
    const [showSettings, setShowSettings] = useState<boolean | null>(false)
    const [barHeight, setBarHeight] = useState<number | null>(0)
    const [isAutoScrolling, setIsAutoScrolling] = useState<boolean | null>(false)
    useEffect(() => {
        let myInterval;
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
            }, 10);

        }
        if (ref.current) {
            setBodyHeight(ref.current.clientHeight)
        }
        if (getAyah.get("ayah") && data) {
            setTimeout(() => {
                location.hash = `#${getAyah.get("ayah")}`
            }, 500);
        }
        return () => clearInterval(myInterval)
    }, [surah, bodyHeight, isAutoScrolling])

    return (
        <>
            <div onClick={() => setShowSettings(!showSettings)} className={`fixed transition-all duration-700 ${!showSettings ? "bottom-[20px]" : "bottom-[80px]"} right-4 bg-white p-[10px] rounded-lg border-solid border-[#000] border-2 cursor-pointer`}>
                <img src={settings} className="size-[20px] " alt="" />
            </div>
            <div className="fixed w-[4px] bg-black left-1 top-[70px]" style={{ height: `${barHeight}vh` }} />
            {isLoading ? <Loader /> : <>
                <AnimatePresence>
                    {showSettings &&
                        <>

                            <motion.div
                                initial={{ marginBottom: -100 }}
                                animate={{ marginBottom: 0 }}
                                transition={{ duration: .7 }}
                                exit={{ marginBottom: -100 }}
                                className="fixed bottom-0 w-full left-0 flex items-center justify-between bg-[#FFF] p-2 border-t-solid border-t-black border-t-2 pt-4">
                                <div className="flex justify-between items-center" >
                                    <div>
                                        <button onClick={() => {
                                            if (fontSize >= 18) {
                                                setFontSize(current => current -= 2)
                                            }
                                        }} className="max-sm:text-sm px-[15px] py-2 mx-2 bg-[#ddd] text-lg cursor-pointer rounded-lg border-solid border-[#000] border-2">تصغير الخط</button>
                                        <button onClick={() => setFontSize(current => current += 2)} className="max-sm:text-sm px-[15px] py-2 mx-2 bg-[#ddd] text-lg cursor-pointer rounded-lg border-solid border-[#000] border-2"> تكبير الخط</button>
                                    </div>
                                    <div>
                                        <Link to={`/quran/by-surahs/${+surahName! < 114 ? `${+surahName! - 1}` : ""}`} className="max-sm:text-sm px-[15px] py-2 mx-2 mb-3 bg-[#ddd] text-lg cursor-pointer rounded-lg border-solid border-[#000] border-2"> السورة السابقة</Link>
                                        <Link to={`/quran/by-surahs/${+surahName! < 114 ? `${+surahName! + 1}` : ""}`} className="max-sm:text-sm px-[15px] py-2 mx-2 mb-3 bg-[#ddd] text-lg cursor-pointer rounded-lg border-solid border-[#000] border-2"> السورة التالية</Link>
                                    </div>
                                </div>
                                <button onClick={() => setIsAutoScrolling(!isAutoScrolling)} className="max-sm:text-sm px-[15px] py-2 mx-2 mb-3 bg-[#ddd] text-lg cursor-pointer rounded-lg border-solid border-[#000] border-2 absolute top-[-50px] left-2">تفعيل الانزلاق التلقائي</button>

                            </motion.div>
                        </>
                    }
                </AnimatePresence>
                <div className="text-center py-4 text-xl border-solid border-2 border-green-300 bg-white mx-1 mb-4 sticky top-0">سورة {data[+surahName! - 1].name}</div>
                <section ref={ref} className="p-3 pb-[70px]">
                    <JuzItem font={fontSize} juzNum={Number(surah![0]?.juz_id)} />
                    {
                        surah?.map((ayah, idx) => {
                            return (
                                <>
                                    <div data-juz={ayah.juz_id} onClick={() => {
                                        setCurrentAyah(+ayah.number_in_surah);
                                        localStorage.setItem("last_ayah", JSON.stringify({ surahName, ayahNumber: idx + 1 }))
                                    }} id={(idx + 1).toString()} style={{ fontSize }} className={`font-semibold cursor-pointer leading-[2.5] text-lg inline ${currentAyah === +ayah.number_in_surah ? "text-red-500" : ""}`}>
                                        {ayah.text}
                                        <span style={{ fontSize: fontSize }} className="size-[40px] rounded-[50%] p-2 text-green-500 m-2 border-solid border-2 border-green-400 inline-flex items-center justify-center text-[18px]">{ayah.number_in_surah}</span>
                                    </div>
                                    {Number(surah[idx]?.juz_id) > Number(surah[idx - 1]?.juz_id) &&
                                        <JuzItem font={fontSize} juzNum={Number(surah![idx]?.juz_id)} />
                                    }
                                </>
                            )
                        })
                    }
                    {surah![0].surah_id === "114" && <EndDuaa font={fontSize} />}
                </section>
            </>}
        </>
    )
}
export function EndDuaa({ font, title }: { title?: string, font: number }) {
    return (
        <>
            {title &&
                <h3>{title}</h3>
            }
            <section style={{ fontSize: font }} className="p-3 border-r-solid border-r-green-300 bg-green-50 border-r-[7px] leading-[1.5] rounded-lg mt-10 mb-5">
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
export function JuzItem({ juzNum, font }: { font: number, juzNum: number }) {
    return (
        <div style={{ fontSize: font * 1.2 }} className="block w-full p-3 sticky top-[70px] bg-white text-center rounded-lg border-2 border-solid border-black my-4 text-black z-[999] mt-1"> الجزء {juzNum}</div>
    )
}
export default SurahText