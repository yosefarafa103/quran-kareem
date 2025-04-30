import axios, { AxiosResponse } from "axios";
import { Link, useParams, useSearchParams } from "react-router"
import { Surah, SurahsAyahs } from "../types/quranSurahs";
import { useFetchQuery } from "../hooks/useFetchQuery";
import data from "../data/quranSurahs.json"
import Loader from "./Loader";
import { useEffect, useRef, useState } from "react";
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
    useEffect(() => {
        if (getAyah.get("ayah") && data) {
            setTimeout(() => {
                location.hash = `#${getAyah.get("ayah")}`
            }, 500);
        }
    }, [])
    return (
        <>
            {isLoading ? <Loader /> : <>
                <div className="fixed bottom-0 w-full left-0 flex items-center justify-between bg-[#FFF] p-2 border-t-solid border-t-black border-t-2 pt-4">
                    <div>
                        <button onClick={() => {
                            if (fontSize >= 18) {
                                setFontSize(current => current -= 2)
                            }
                        }} className="max-sm:text-sm px-[15px] py-2 mx-2 bg-[#ddd] text-lg cursor-pointer rounded-lg">تصغير الخط</button>
                        <button onClick={() => setFontSize(current => current += 2)} className="max-sm:text-sm px-[15px] py-2 mx-2 bg-[#ddd] text-lg cursor-pointer rounded-lg"> تكبير الخط</button>
                    </div>
                    <div>
                        <Link to={`/quran/by-surahs/${+surahName! < 114 ? `${+surahName! - 1}` : ""}`} className="max-sm:text-sm px-[15px] py-2 mx-2 mb-3 bg-[#ddd] text-lg cursor-pointer rounded-lg"> السورة السابقة</Link>
                        <Link to={`/quran/by-surahs/${+surahName! < 114 ? `${+surahName! + 1}` : ""}`} className="max-sm:text-sm px-[15px] py-2 mx-2 mb-3 bg-[#ddd] text-lg cursor-pointer rounded-lg"> السورة التالية</Link>
                    </div>
                </div>
                <div className="text-center py-4 text-xl border-solid border-2 border-green-300 mx-1 mb-4">سورة {data[+surahName! - 1].name}</div>
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
                </section>
            </>}
        </>
    )
}
export function JuzItem({ juzNum, font }: { font: number, juzNum: number }) {
    return (
        <div style={{ fontSize: font * 1.2 }} className="block w-full p-3 text-white text-center rounded-lg bg-black my-4 mt-1"> الجزء {juzNum}</div>

    )
}
export default SurahText