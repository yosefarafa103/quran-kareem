import { Link, useParams, useSearchParams } from "react-router";
import { Surah } from "../types/quranSurahs";
import {
  CSSProperties,
  lazy,
  memo,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { quran } from "@/constants/quran";
import tafsirat, { TafsirItem } from "@/constants/tafsirs";
import { S } from "../constants/quran";
import { quranV2 } from "../constants/quran-v2";
import { Separator } from "./ui/separator";
import Sajda from "@/assets/images/bismillah.png";
import TafsirPopup from "./TafsirPopup";
const SwappingSettings = lazy(() => import("./SwappingSettings"));
const FilteringAyahs = lazy(() => import("./surahs/FilteringAyahs"));
const SearchForAyah = lazy(() => import("./surahs/SearchForAyah"));
import { arabicNumber as numbers, themes } from "@/constants/variables";
import Loader from "./Loader";
import { Pause, Play } from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";
type TafserItem = Pick<TafsirItem, "ayah_url" | "text">;
const SurahText = () => {
  const [fontSize, setFontSize] = useState(() =>
    localStorage.getItem("font_size")
      ? Number(localStorage.getItem("font_size"))
      : 18,
  );
  const { theme } = useThemeStore();

  let { id: surahName } = useParams<{ id: string }>();
  const [scrollSpeed] = useState<number>(() =>
    localStorage.getItem("scrolling_speed")
      ? Number(localStorage.getItem("scrolling_speed"))
      : 1,
  );
  const [getAyah] = useSearchParams();
  const ref = useRef<HTMLElement | null>(null);
  const [currentAyah, setCurrentAyah] = useState<number | null>(
    getAyah.get("ayah") ? +getAyah.get("ayah")! : null,
  );
  const [bodyHeight, setBodyHeight] = useState<number | null>(0);
  const [barHeight, setBarHeight] = useState<number | null>(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean | null>(false);
  const replaceNumsEnglishToArabic = useCallback((ayahNum: string) => {
    return numbers.map((_) =>
      ayahNum
        ?.split("")
        .map((ltr) => {
          const arabicItem = numbers.find((val) => val.english.includes(ltr));
          return ltr.replace(ltr, arabicItem!?.arabic);
        })
        .join(""),
    )[0];
  }, []);
  const tafsirSurah = useMemo<string[]>(
    () =>
      tafsirat
        .reduce((el, acc) => el.concat(acc), [])
        .map((el: TafserItem) => [el?.ayah_url?.slice(1), el?.text])
        .filter((el: string[]) => el[0]?.split("/")[1] === surahName),
    [surahName],
  ).sort((el, el2) => +el[0].split("/")[2] - +el2[0].split("/")[2]);
  const [searchedAyah, setSearchedAyah] = useState<string>("");
  const [filterdAyah, setFilterdAyah] = useState<Surah[] | undefined>(
    undefined,
  );

  const [isTafsirOpen, setIsTafsirOpen] = useState<boolean>(false);
  const suraah = useMemo<S>(() => quran[Number(surahName) - 1], [surahName]);
  useEffect(() => {
    let myInterval: NodeJS.Timeout;
    // Auto Scrolling
    if (isAutoScrolling) {
      myInterval = setInterval(() => {
        window.onscroll = () => {
          if (scrollY === bodyHeight) return clearInterval(myInterval);
        };
        // setBarHeight((window.scrollY / bodyHeight!) * 100);
        window.scrollBy({
          top: scrollSpeed,
          behavior: "smooth",
        });
      });
    }
    // Auto Scrolling

    if (ref.current) {
      setBodyHeight(ref.current.clientHeight);
    }
    if (getAyah.get("ayah") && suraah) {
      setTimeout(() => {
        location.hash = `#${getAyah.get("ayah")}`;
      }, 500);
      setCurrentAyah(parseInt(getAyah.get("ayah") ?? ""));
    }
    return () => clearInterval(myInterval);
  }, [bodyHeight, isAutoScrolling]);
  useEffect(() => {
    window.scroll({ top: 0, behavior: "instant" });
    setCurrentAyah(null);
  }, [suraah]);

  useEffect(() => localStorage.setItem("font_size", `${fontSize}`), [fontSize]);
  useEffect(() => {
    setFilterdAyah(
      suraah.ayahs.filter((a) =>
        a.text.replace(/[\u064B-\u0652]/g, "").includes(searchedAyah),
      ),
    );
  }, [searchedAyah]);

  const [tafsirAyahNumber, tafsirAyahContent] = [
    tafsirSurah.map((el) => el[0].split("/")[2]),
    tafsirSurah.map((el) => el[1]),
  ];
  const themeStyleProps = {
    borderColor: themes[parseInt(parseInt(theme!.split("-")?.[1]))  - 1]?.secondaryColor,
    backgroundColor: themes[parseInt(parseInt(theme!.split("-")?.[1]))  - 1]?.primaryColor,
  };
  return (
    <Suspense fallback={<Loader isFullScreen />}>
      <SwappingSettings
        surahName={+surahName!}
        fontSize={fontSize}
        setFontSize={setFontSize}
        setIsTafsirOpen={setIsTafsirOpen}
      />
      <AnimatePresence>
        {isTafsirOpen && (
          <TafsirPopup
            setIsTafsirOpen={setIsTafsirOpen}
            tafsirSurahAyahs={tafsirAyahNumber}
            tafsirSurah={tafsirAyahContent}
          />
        )}
      </AnimatePresence>
      <SearchForAyah setSearchedAyah={setSearchedAyah} />
      <AnimatePresence>
        {searchedAyah && (
          <FilteringAyahs
            fontSize={fontSize}
            searchedAyah={searchedAyah}
            setCurrentAyah={setCurrentAyah}
            setSearchedAyah={setSearchedAyah}
            filterdAyah={filterdAyah}
          />
        )}
      </AnimatePresence>
      <div
        className="fixed w-[4px] bg-background left-1 pt-3 top-[70px] "
        style={{ height: `${barHeight}vh` }}
      />

      <Button
        variant={"secondary"}
        onClick={() => setIsAutoScrolling(!isAutoScrolling)}
        className={`fixed size-[45px] transition-all duration-700 bottom-[100px] right-4 bg-background text-primary p-[10px] rounded-lg border-solid border-primary border-2 cursor-pointer flex items-center justify-center `}
      >
        {!isAutoScrolling ? <Play /> : <Pause />}
      </Button>
      <div
        style={themeStyleProps}
        className="text-center z-[9] transition-all duration-700 py-2 pt-3 text-lg bg-background border-solid border-2 border-green-500 w-[90%] mx-auto mb-2 sticky top-[60px]"
      >
        {quranV2[+surahName - 1].surahNameArabic}
      </div>
      <section ref={ref} className="mb-2 pb-[70px] text-center p-2">
        <JuzItem
          style={themeStyleProps}
          font={fontSize}
          juzNum={replaceNumsEnglishToArabic(suraah?.ayahs[0].juz + "")}
        />
        {suraah.ayahs
          ?.map((e) => {
            e.number = +(e.number + "");
            return e;
          })
          ?.map((ayah, idx, a) => {
            return (
              <>
                <div
                  data-juz={ayah.juz}
                  onClick={() => {
                    setCurrentAyah(+ayah.numberInSurah);
                    localStorage.setItem(
                      "last_ayah",
                      JSON.stringify({ surahName, ayahNumber: idx + 1 }),
                    );
                  }}
                  id={(idx + 1).toString()}
                  style={{ fontSize }}
                  className={`font-semibold cursor-pointer leading-[1.6] w-full inline ${
                    currentAyah === +ayah.numberInSurah ? "text-red-500" : ""
                  }`}
                >
                  {quranV2[+surahName - 1].arabic1[idx]}
               
                  <span
                    style={{
                      fontSize: fontSize - 3,
                      ...themeStyleProps,
                      color: themeStyleProps.borderColor,
                    }}
                    className="size-[30px] rounded-[50%] isolate p-2 text-green-500 mx-2 m-1 border-solid border-2 border-green-400 inline-flex items-center justify-center text-[18px]"
                  >
                    {replaceNumsEnglishToArabic(
                      ayah?.numberInSurah?.toString(),
                    )}
                  </span>
                </div>
                {suraah.ayahs[idx]?.juz < suraah.ayahs[idx + 1]?.juz && (
                  <JuzItem
                    style={themeStyleProps}
                    juzNum={ayah?.juz + 1 + ""}
                  />
                )}
                {suraah.ayahs[idx]?.page < suraah.ayahs[idx + 1]?.page && (
                  <div
                    style={{
                      borderTopColor:
                        themes[((parseInt(theme!.split("-")?.[1]))  - 1)]?.border,
                      borderBottomColor:
                        themes[(parseInt(theme!.split("-")?.[1]))  - 1]?.border,
                    }}
                    className="my-4 border-y-2 border-y-green-500"
                  >
                    <div
                      style={{
                        fontSize: fontSize - 3,
                        borderColor: themeStyleProps.borderColor,
                        backgroundColor:
                          themes[(parseInt(theme!.split("-")?.[1]))  - 1]?.border,
                      }}
                      className={`mx-auto flex items-center justify-center my-2 size-[40px] text-secondary-foreground text-xl p-3 sticky transition-all duration-700 top-[3px] bg-background text-center rounded-[50%] border-2 border-solid border-green-500 isolate z-[1]`}
                    >
                      {replaceNumsEnglishToArabic(ayah.page + "")}
                    </div>
                  </div>
                )}
              </>
            );
          })}
        {surahName === "114" && <EndDuaa font={fontSize} />}
      </section>
    </Suspense>
  );
};
export function JuzItem({
  juzNum,
  style,
}: {
  font?: number;
  juzNum: string;
  style?: CSSProperties;
}) {
  return (
    <div className="sticky top-[-4px] z-[2]">
      <Separator />
      <div
        style={style}
        className={`mx-auto items-center justify-center my-2 text-secondary-foreground text-xl p-3 border-green-500 duration-700 bg-background flex gap-1 border-2 text-center z-[9] transition-all py-2 pt-3 border-solid mb-2 sticky top-[65px]`}
      >
        الجزء {juzNum + ""}
      </div>
      <Separator />
    </div>
  );
}

export function EndDuaa({ font, title }: { title?: string; font: number }) {
  return (
    <>
      {title && <h3>{title}</h3>}
      <section
        style={{ fontSize: font }}
        className="p-3 border-r-solid border-r-green-300 bg-background border-r-[7px] leading-[1.5] rounded-lg mt-10 mb-5"
      >
        اللهم اجعل القرآن العظيم ربيع قلبي، ونور صدري، وجلاء حزني، وذهاب همّي.
        اللهم علّمني منه ما جهلت، وذكّرني منه ما نُسّيت، وارزقني تلاوته آناء
        الليل وأطراف النهار، واجعله حجةً لي يا رب العالمين. اللهم اجعلني ممن
        يحلّ حلاله، ويحرّم حرامه، ويعمل بمحكمه، ويؤمن بمتشابهه. اللهم اجعل
        القرآن لنا في الدنيا قرينًا، وفي القبر مؤنسًا، وعلى الصراط نورًا، وفي
        الجنة رفيقًا، ومن النار ستراً وحجابًا. اللهم اجعلنا من أهل القرآن الذين
        هم أهلك وخاصتك، يا أرحم الراحمين. اللهم اجعل ختمتنا هذه ختمةً مباركة،
        واجعلها شاهدةً لنا لا علينا، وتقبّلها منا يا أكرم الأكرمين.
      </section>
    </>
  );
}

export default memo(SurahText);
