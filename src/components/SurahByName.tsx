import { Link } from "react-router";
import SearchBox from "./SearchBox";
import { ReactNode, useContext, useEffect, useState } from "react";
import SearchInSurahsContext, {
  SearchInSurahsContext as SearchContext,
} from "../context/SearchInSurahsContext";
import { S } from "@/constants/quran";
import { quran } from "@/constants/quran";
import { useFilterAyah } from "@/hooks/useFilterAyah";
import { removeTashkil, replaceNumsEnglishToArabic } from "@/utils/helpers";
import { AnimatePresence, motion } from "framer-motion";
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

const SurahByName = () => {
  const [filter, setFilter] = useState<S[] | null>(null);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const { setValue, value } = useContext(SearchContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [currentTheme, setCurrentTheme] = useState<
  //   Partial<(typeof themes)[number]> | undefined
  // >();
  const [searchedAyah, setSearchedAyah] = useState<string>("");
  const { filterdData } = useFilterAyah({
    isInSurah: false,
    searchedAyah,
    surahNumber: 0,
  });
  useEffect(() => {
    setFilter(quran.filter((el) => removeTashkil(el.name!)?.includes(value)));
    if (isOpen) setIsSearched(true);
  }, [isOpen]);
  useEffect(() => {
    setFilter(quran.filter((el) => removeTashkil(el.name!)?.includes(value)));
  }, [value]);
  const { theme } = useThemeStore();

  const themeStyleProps = {
    borderColor: themes[parseInt(theme!.split("-")?.[1]) - 1]?.secondaryColor,
    backgroundColor: themes[parseInt(theme!.split("-")?.[1]) - 1]?.primaryColor,
  };
  return (
    <section>
      <AnimatePresence>
        {isSearched && (
          <FilterPopupWrapper>
            <div className="mb-4 flex items-center justify-between relative z-9999999999 isolate">
              <div>
                {isSearched
                  ? ` 
                          تم العثور علي
                          ${replaceNumsEnglishToArabic(
                            filterdData?.length + "",
                          )}  
                          نتائج
                      `
                  : "لم يتم العثور علي نتائج"}
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
                      {replaceNumsEnglishToArabic(a?.numberInSurah?.toString())}
                    </span>
                    {a.name}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {a.data?.map((e) => (
                    <div className="flex gap-1 pr-7 my-5 relative after:absolute after:h-1 after:w-[20px] after:bg-green-400 after:right-[8px] after:top-2.5 z-[666666] after:z-[-1]">
                      <span
                        style={{
                          ...themeStyleProps,
                          color:
                            themes[parseInt(theme!.split("-")?.[1]) - 1]
                              ?.secondaryColor,
                        }}
                        className="size-[30px] rounded-[50%] p-2 text-green-500 border-solid border-1 border-green-400 inline-flex items-center justify-center !text-[14px] bg-background"
                      >
                        {replaceNumsEnglishToArabic(
                          e?.numberInSurah?.toString(),
                        )}
                      </span>
                      <p className="text-[16px] "> {e?.text} </p>
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
              to={`${item?.number}`}
              style={{
                borderColor:
                  themes[+theme?.theme!?.split("-")?.[1] - 1]?.border,
              }}
              className={cn(
                "pb-4 mt-3 rounded-lg cursor-pointer flex-col gap-2 justify-center border-solid border-2 mx-3",
              )}
            >
              <section
                style={{
                  borderBottomColor:
                    themes[+theme?.theme!?.split("-")?.[1] - 1]?.border,
                }}
                className="px-3 font-bold text-md max-sm:text-sm border-solid border-2 border-transparent border-b-green-400 pt-2 pb-3"
              >
                {item?.name}
              </section>
              <section className="px-3 mt-3">
                <div className="flex items-center justify-between">
                  <div>عدد اياتها</div>
                  <span className="size-[30px] rounded-md px-5 text-white bg-green-700 flex items-center justify-center text-sm background">
                    {` ${item.ayahs.length}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>نوعها</div>
                  <div className="rounded-md px-3 py-1.5 text-white bg-green-700 flex items-center justify-center text-sm mt-3 background">
                    {item.type === "Meccan" ? `  مكية  ` : `  مدنية `}
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
