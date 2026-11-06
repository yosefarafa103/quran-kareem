import { Link } from "react-router";
import SearchBox from "./SearchBox";
import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import SearchInSurahsContext, {
  SearchInSurahsContext as SearchContext,
} from "@/context/SearchInSurahsContext";
// d:\core-all\meanings.json\meanings.json
import { useFilterAyah } from "@/hooks/useFilterAyah";
import { AnimatePresence, } from "framer-motion";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import FilterPopupWrapper from "./FilterPopupWrapper";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import ExtractAyaFromQuran from "./surahs/ExtractAyaFromQuran";
import QuranNav from "./Quran";
import { cn } from "@/lib/utils";
import { themes } from "@/constants/variables";
import { useThemeStore } from "@/stores/themeStore";
import { quranV2 } from "@/constants/quran-v2";
type QuranV2Surah = typeof quranV2[number];
function removeQuranMarks(text: string) {
  return text
    .replace(/[\u064B-\u065F\u0670]/g, "")

    .replace(/[\u06D6-\u06ED]/g, "")

    .replace(/\u0640/g, "")

    .replace(/[\u06DD\u06DE\u06E9]/g, "");
}


const SurahByName = () => {
  const [filter, setFilter] = useState<QuranV2Surah[] | null>(null);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const { setValue, value } = useContext(SearchContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchedAyah, setSearchedAyah] = useState<string>("");
  const { filterdData } = useFilterAyah({
    isInSurah: false,
    searchedAyah,
    surahNumber: 0,
  });
  useEffect(() => {
    setFilter(quranV2.filter((el) => (el['surahNameArabic'])?.includes(value)));
    if (isOpen) setIsSearched(true);
  }, [isOpen]);
  useEffect(() => {
    setFilter(quranV2.filter((el) => (el['surahNameArabic']).includes(value)));
  }, [value]);
  const { theme } = useThemeStore();
  const themeStyleProps = useMemo(() => ({
    borderColor: themes[parseInt(theme!.split("-")?.[1]) - 1]?.secondaryColor,
    backgroundColor: themes[parseInt(theme!.split("-")?.[1]) - 1]?.primaryColor,
    fontFamily: 'amiri'
  }), []);
  return (
    <section >
      <AnimatePresence>
        {isSearched && (
          <FilterPopupWrapper>
            <div className="mb-4 flex items-center justify-between relative z-9999999999 isolate">
              <div>
                {isSearched
                  ?

                  <span>  تم العثور علي
                    <span className="bg-green-400 text-background mx-2 inline-flex px-2 rounded-4xl text-sm">{searchedAyah} </span>
                    في {filterdData.length.toLocaleString('ar-eg')} سورة
                  </span>
                  : "لم يتم العثور علي نتائج"
                }
              </div>
              <Button
                variant={"default"}
                onClick={() => {
                  setSearchedAyah("");
                  setIsSearched(false);
                }}
              >
                رجوع
              </Button>
            </div>
            <Separator />
            {filterdData?.map((a) => (
              <Collapsible className="relative after:absolute after:h-full after:w-1 after:bg-green-400 after:right-[8px] after:top-0 z-10 after:z-[-2] ">
                <CollapsibleTrigger>
                  <div
                    className="flex gap-2 text-foreground cursor-pointer"
                    key={a.name}
                  >
                    <span
                      style={themeStyleProps}
                      className="size-[10px] rounded-[50%] p-2 bg-green-600 border-solid border-1 border-green-400 inline-flex items-center justify-center !text-[14px]"
                    >
                    </span>
                    {a.name}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent >
                  {a.data?.map((e) => (
                    <div className="flex gap-1 pr-10 my-5 relative after:absolute after:h-1 after:w-[20px] after:bg-green-400 after:right-[8px] after:top-2.5 z-[666666] after:z-[-1]">
                      <p className="text-[16px] ">
                        {e.split(' ').map((el, i) => searchedAyah.length && el.includes(searchedAyah) ? <span className="inline-flex bg-green-400 text-background px-1" > {`${el} `} </span> : ` ${el} `)}
                      </p>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </FilterPopupWrapper>
        )}
      </AnimatePresence>
      <ExtractAyaFromQuran
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setSearchedAyah={setSearchedAyah}
      />
      <h2 className="font-bold text-xl border-solid border-2 border-transparent border-b-[#eee] pb-5 pr-3">
        سور القران
      </h2>
      <QuranNav />
      <SearchBox setFilter={setValue} />
      <section className="grid md:grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-">
        {!filter?.length && value.length > 0 ? (
          <div className="px-5">لم يتم العثور علي نتائج</div>
        ) : (
          filter!?.map((item) => (
            <Link
              to={`${item?.surahNo}`}
              // style={{
              //   borderColor:
              //     themes[+theme!?.split("-")?.[1] - 1]?.border,
              // }}
              className={cn(
                "pb-4 mt-3 rounded-lg border-[var(--borderColor)] cursor-pointer flex-col gap-2 justify-center border-solid border-2 mx-3",
              )}
            >
              <section
                style={{
                  // borderBottomColor:
                  //   themes[+theme!?.split("-")?.[1] - 1]?.border,
                  fontFamily: "amiri"

                }}
                className="px-3 font-bold text-md max-sm:text-sm border-solid border-2 border-transparent border-b-[var(--borderColor)] pt-2 pb-3"
              >
                {item?.surahNameArabic}
              </section>
              <section className="px-3 mt-3">
                <div className="flex items-center justify-between">
                  <div>عدد اياتها</div>
                  <span className="size-[30px] rounded-md border-2 text-[var(--borderColor)] px-5 border-[var(--borderColor)] flex items-center justify-center text-sm background">
                    {`${Number(item.totalAyah)?.toLocaleString("ar-eg")}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>نوعها</div>
                  <div className="rounded-md px-3 py-1.5 border-2 text-[var(--borderColor)] border-[var(--borderColor)] flex items-center justify-center text-sm mt-3 background">
                    {item.revelationPlace === "Mecca" ? `مكية` : `  مدنية `}
                  </div>
                </div>
              </section>
            </Link>
          ))
        )}
      </section>
    </section>
  );
};

export default SurahByName;

export function Wrapper({ children }: { children: ReactNode }) {
  return <SearchInSurahsContext>{children}</SearchInSurahsContext>;
}
