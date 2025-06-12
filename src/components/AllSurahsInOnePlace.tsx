import React, { useCallback, useMemo } from 'react'
import { quran } from "@/constants/quran"
import { EndDuaa, JuzItem } from './SurahText';
import { Separator } from './ui/separator';
import { MoveUp } from 'lucide-react';
import { Button } from './ui/button';

const AllSurahsInOnePlace = () => {
    console.log(quran);
    const fontSize = useMemo((): number => +localStorage.getItem("font_size")! || 18, [])
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
    return (
        <>
            <Button onClick={() => location.href = "#"} className='fixed bottom-4 right-4 cursor-pointer z-[12] ' size={"icon"}>
                <MoveUp />
            </Button>
            {quran.map((el, i) => (
                <div>
                    <section className="mb-2 pb-[70px] px-[22px] text-center">
                        <div
                            className="text-center z-[9] transition-all duration-700 py-2 pt-3 text-lg border-solid border-2 border-green-300 bg-background w-[90%] rounded-xl mx-auto mb-2 sticky top-[60px]"> {el!.name}</div>
                        <JuzItem font={fontSize} juzNum={replaceNumsEnglishToArabic(el?.ayahs[0].juz + "")} />
                        {
                            el?.ayahs?.map(e => {
                                e.number = +(e.number + "")
                                return e
                            })?.map((ayah, idx, a) => {
                                return (
                                    <>
                                        <>
                                            <div onClick={() => {
                                                localStorage.setItem("last_ayah_in_moshaf", `Surah-${el.number}-${idx + 1}`)
                                            }} id={(`Surah-${el.number}-${idx + 1}`).toString()} style={{ fontSize }} className={`font-semibold cursor-pointer leading-[2] text-lg w-full inline ${i === +localStorage.getItem('last_ayah_in_moshaf')?.split("-")[1] && ayah.numberInSurah === +localStorage.getItem('last_ayah_in_moshaf')?.split("-")[2] && "text-red-500"} `}>
                                                {+idx! !== 8 && idx === 0 && !ayah?.text.includes("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ") ? ayah?.text.slice(38) : ayah.sajda ? ayah.text.slice(0, ayah.text.length - 1) : ayah.text}
                                                <span style={{ fontSize: fontSize }} className="size-[30px] rounded-[50%] isolate p-2 text-green-500 mx-2 m-1 border-solid border-2 border-green-400 inline-flex items-center justify-center text-[18px]">   {replaceNumsEnglishToArabic(ayah?.numberInSurah?.toString())}</span>
                                            </div>
                                            {el.ayahs[idx]?.juz < el.ayahs[idx + 1]?.juz &&
                                                <JuzItem font={fontSize} juzNum={ayah?.juz + 1 + ""} />
                                            }
                                            {el.ayahs[idx]?.page < el.ayahs[idx + 1]?.page &&
                                                <div className="py-4">
                                                    <Separator />
                                                    <div className={`mx-auto flex items-center justify-center my-2 size-[40px] text-secondary-foreground text-xl p-3 sticky transition-all duration-700 top-[3px] bg-background text-center rounded-[50%] border-2 border-solid border-secondary-foreground isolate z-[1]`}>  {replaceNumsEnglishToArabic(ayah?.page + "")}</div>
                                                    <Separator />
                                                </div>
                                            }
                                        </>
                                    </>
                                )
                            })
                        }

                        {i + 1 + "" === "114" && <EndDuaa font={fontSize} />}
                    </section >
                </div>
            ))}

        </>
    )
}

export default AllSurahsInOnePlace