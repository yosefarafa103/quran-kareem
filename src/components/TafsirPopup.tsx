import { Dispatch, SetStateAction, useId, useState } from "react";
import FilterPopupWrapper from "./FilterPopupWrapper";
import { replaceNumsEnglishToArabic } from "@/utils/helpers";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";

interface Props {
    tafsirSurah: string[];
    tafsirSurahAyahs: string[];
    setIsTafsirOpen: Dispatch<SetStateAction<boolean>>
}
const TafsirPopup = ({ setIsTafsirOpen, tafsirSurah, tafsirSurahAyahs }: Props) => {
    const [filterTafsirAyah, setFilterTafsirAyah] = useState<null | number>(null);
    return (
        <FilterPopupWrapper >
            <div className="mb-4 flex items-center justify-between">
                <div>
                    تفسير الايات المتاحة في التفسير الميسر
                </div>
                <Button onClick={() => setIsTafsirOpen(prev => !prev)} variant={"default"} >رجوع</Button>
            </div>
            <Separator />
            <Input type="number" onChange={(e) => {
                filterTafsirAyah === undefined ? setFilterTafsirAyah(null) :
                    setFilterTafsirAyah(+e.target.value)
            }} className="mt-2" placeholder={`اكتب رقم الاية من الايه ${1} الي ${tafsirSurah.length}`} />
            <section className="mt-5">

                {filterTafsirAyah > 0 && filterTafsirAyah < tafsirSurahAyahs.length ? <>
                    <div className="mb-4 text-orange-400" >
                        <span className="size-[30px] rounded-[50%] p-2 text-orange-700 outline-2 outline-orange-400 mx-2 m-1 bg-white border-solid border-2 border-orange-200 inline-flex items-center justify-center text-[18px]">{replaceNumsEnglishToArabic(tafsirSurahAyahs[filterTafsirAyah - 1])}</span>
                        {tafsirSurah[filterTafsirAyah - 1]}
                    </div>
                </> : +filterTafsirAyah > tafsirSurahAyahs.length ? <h2> اكتب رقم الايه الصحيح </h2> :

                    tafsirSurah.map((el, i) => (
                        <>
                            <div className="mb-4 dark:text-orange-300 mt-4" key={el + i * 10000}>
                                <span className="size-[35px] rounded-[50%] p-2 text-orange-700 outline-2 outline-orange-400 mx-2 m-1 bg-white border-solid border-2 border-orange-200 inline-flex items-center justify-center text-[18px]">{replaceNumsEnglishToArabic(tafsirSurahAyahs[i])}</span>
                                {el} </div>
                            <Separator />

                        </>
                    ))
                }

            </section>
        </FilterPopupWrapper>
    )
}

export default TafsirPopup