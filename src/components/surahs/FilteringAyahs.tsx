import React, { useCallback } from "react";
import FilterPopupWrapper from "../FilterPopupWrapper";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { arabicNumber as numbers } from "@/constants/variables";
import { Surah } from "@/types/quranSurahs";
type FilteringAyahsProps = {
  filterdAyah: Surah[] | undefined;
  searchedAyah: string;
  setSearchedAyah: React.Dispatch<React.SetStateAction<string>>;
  setCurrentAyah: React.Dispatch<React.SetStateAction<number | null>>;
  fontSize: number;
};

const FilteringAyahs = ({
  filterdAyah,
  fontSize,
  searchedAyah,
  setCurrentAyah,
  setSearchedAyah,
}: FilteringAyahsProps) => {
  const replaceNumsEnglishToArabic = useCallback((ayahNum: string) => {
    return numbers.map((_) =>
      ayahNum
        ?.split("")
        .map((ltr) => {
          const arabicItem = numbers.find((val) => val.english.includes(ltr));
          return ltr.replace(ltr, arabicItem!?.arabic);
        })
        .join("")
    )[0];
  }, []);
  const handelSelectAyah = useCallback((ayahNum: string) => {
    setSearchedAyah("");
    setTimeout(() => {
      location.hash = ayahNum;
      setCurrentAyah(+ayahNum);
    }, 1000);
  }, []);
  return (
    <FilterPopupWrapper>
      <div className="mb-4 flex items-center justify-between">
        <div className="sticky z-9999999999 top-0 right-0">
          {filterdAyah?.length
            ? ` 
                تم العثور علي
                ${replaceNumsEnglishToArabic(filterdAyah?.length + "")}
                نتائج ( ${searchedAyah} )
            `
            : "لم يتم العثور علي نتائج"}
        </div>
        <Button variant={"default"} onClick={() => setSearchedAyah("")}>
          رجوع
        </Button>
      </div>
      <Separator />
      <section className="flex flex-col gap-2 pt-5">
        {filterdAyah?.map((a) => (
          <div
            onClick={() => handelSelectAyah(a.numberInSurah + "")}
            className="flex gap-2 text-foreground cursor-pointer"
            key={a.text + Math.random() + "abcde"}
          >
            <span
              style={{ fontSize: fontSize }}
              className="size-[30px] rounded-[50%] p-2 text-green-500 border-solid border-2 border-green-400 inline-flex items-center justify-center !text-[14px]"
            >
              {replaceNumsEnglishToArabic(a?.numberInSurah?.toString())}
            </span>
            {a.text}
          </div>
        ))}
      </section>
    </FilterPopupWrapper>
  );
};

export default FilteringAyahs;
