import { Dispatch, SetStateAction, useId } from "react";
import FilterPopupWrapper from "./FilterPopupWrapper";
import { replaceNumsEnglishToArabic } from "@/utils/helpers";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface Props {
    tafsirSurah: string[];
    tafsirSurahAyahs: string[];
    setIsTafsirOpen: Dispatch<SetStateAction<boolean>>
}
const TafsirPopup = ({ setIsTafsirOpen, tafsirSurah, tafsirSurahAyahs }: Props) => {
    return (
        <FilterPopupWrapper >
            <div className="mb-4 flex items-center justify-between">
                <div>
                    تفسير الايات المتاحة في التفسير الميسر
                </div>
                <Button onClick={() => setIsTafsirOpen(prev => !prev)} variant={"default"} >رجوع</Button>
            </div>
            <Separator />
            <section className="mt-5">
                {tafsirSurah.map((el, i) => (
                    <div className="mb-4 text-orange-100" key={useId()}>
                        <span className="size-[30px] rounded-[50%] p-2 text-orange-700 outline-2 outline-orange-400 mx-2 m-1 bg-white border-solid border-2 border-orange-200 inline-flex items-center justify-center text-[18px]">{replaceNumsEnglishToArabic(tafsirSurahAyahs[i])}</span>
                        {el} </div>
                ))}
            </section>
        </FilterPopupWrapper>
    )
}

export default TafsirPopup