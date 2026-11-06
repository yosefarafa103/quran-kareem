
import { useLocation, useParams, useSearchParams } from "react-router";
import { Surah } from "../types/quranSurahs";
import {
  CSSProperties,
  Dispatch,
  lazy,
  memo,
  SetStateAction,
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
import { themes } from "@/constants/variables";
import { Pause, Play } from "lucide-react";
import { create } from "zustand";
import ScrollToTop from "./ScrollToTop";
import surahs from "../data/mushafs-1.json";
import meaning from "/public/meanings.json";
import { useThemeStore } from "@/stores/themeStore";
import { cn } from "@/lib/utils";
import { marks, themeProperties } from "@/constants/colors";
import LoaderSurah from "./LoaderSurah";
import ContentViewerPopup from "./ContentViewerPopup";
import Loader from "./Loader";

const SwappingSettings = lazy(() => import("@/components/SwappingSettings"));
const FilteringAyahs = lazy(() => import("./surahs/FilteringAyahs"));
const SearchForAyah = lazy(() => import("./surahs/SearchForAyah"));
const Simillars = lazy(() => import("./Simillars"));
const TafsirPopup = lazy(() => import("./TafsirPopup"));

type TafserItem = Pick<TafsirItem, "ayah_url" | "text">;

interface MeaningItem {
  surah: number;
  ayah: number;
  meaning: {
    book_info: number;
    words: {
      text: string;
      mean: string;
    }[];
  }[];
}

interface Meaning {
  data: MeaningItem[];
}

interface AyahType {
  id: number;
  number: number;
  page_number: number;
  juz: number;
  text: string;
}

type quranV2 = typeof quranV2[number];

const SurahText = () => {
  const { fontSize, setFontSize } = useFontStore();
  const { theme } = useThemeStore();
  const [isTafsirOpen, setIsTafsirOpen] = useState<boolean>(false);
  const location = useLocation();
  let { id: surahName } = useParams<{ id: string }>();

  const [scrollSpeed] = useState<number>(() =>
    localStorage.getItem("scrolling_speed")
      ? Number(localStorage.getItem("scrolling_speed"))
      : 1
  );

  const [getAyah] = useSearchParams();
  const ref = useRef<HTMLElement | null>(null);

  const [currentAyah, setCurrentAyah] = useState<number | null>(
    +getAyah.get("ayah")!
  );

  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(false);
  const [searchedAyah, setSearchedAyah] = useState<string>("");

  const [filterdAyah, setFilterdAyah] = useState<Surah[] | undefined>(
    undefined
  );

  const [showSimilers, setShowSimilers] = useState<boolean>(false);

  const suraah = useMemo<S>(
    () => quran[Number(surahName) - 1],
    [surahName]
  );

  const themeStyleProps = useMemo(() => themeProperties || {}, []);
  const mark = useMemo<{ [k: string]: { color: string } }>(
    () => marks,
    []
  );

  const handelClickToAyahs = useCallback((num: number, idx: number) => {
    setCurrentAyah(num);

    localStorage.setItem(
      "last_ayah",
      JSON.stringify({ surahName, ayahNumber: idx + 1 })
    );
  }, []);

  useEffect(() => {
    let myInterval: NodeJS.Timeout;

    if (isAutoScrolling) {
      myInterval = setInterval(() => {
        window.scrollBy({
          top: scrollSpeed,
          behavior: "smooth",
        });
      }, -10000);
    }

    return () => clearInterval(myInterval);
  }, [isAutoScrolling]);

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    setCurrentAyah(null);
  }, [suraah]);

  useEffect(() => {
    if (getAyah.get("ayah")) {
      setTimeout(() => {
        location.hash = `#${getAyah.get("ayah")}`;

        document
          .getElementById(getAyah.get("ayah") || "")
          ?.scrollIntoView({ behavior: "smooth" });

        if (!!getAyah.get("ayah")) {
          setCurrentAyah(parseInt(getAyah.get("ayah") || ""));
        }
      }, 500);
    }
  }, [suraah, getAyah]);

  let currentMeaning = (meaning as Meaning).data.filter(
    el => el.surah === Number(surahName)
  );

  useEffect(() => {
    setFilterdAyah(
      suraah.ayahs.filter(a =>
        a.text.replace(/[\u064B-\u0652]/g, "").includes(searchedAyah)
      )
    );
  }, [searchedAyah]);

  return (
    <>
      <Suspense fallback={<LoaderSurah />}>
        <SwappingSettings
          surahName={+surahName!}
          fontSize={fontSize}
          setFontSize={setFontSize}
          setIsTafsirOpen={setIsTafsirOpen}
          setIsSimilersOpen={setShowSimilers}
        />

        <Similers
          setIsOpen={setShowSimilers}
          isSimilersOpen={showSimilers}
          surahNumber={Number(surahName)}
        />

        <Tafsir
          isTafsirOpen={isTafsirOpen}
          setIsTafsirOpen={setIsTafsirOpen}
        />

        <SurahSettings
          filterdAyah={filterdAyah}
          fontSize={fontSize}
          isAutoScrolling={isAutoScrolling}
          searchedAyah={searchedAyah}
          setCurrentAyah={setCurrentAyah}
          setFontSize={setFontSize}
          setSearchedAyah={setSearchedAyah}
          setIsAutoScrolling={setIsAutoScrolling}
        />

        <div className="flex justify-between sticky top-[75px] bg-background w-[95%] mx-auto p-3 border-green-500 dark:border-green-200/50 border-2 rounded-lg z-99">
          <JuzItem
            style={themeStyleProps}
            font={fontSize}
            juzNum={(suraah?.ayahs[0].juz).toLocaleString("ar-eg")}
          />

          <div
            style={themeStyleProps}
            className="text-center flex items-center justify-center text-foreground z-[9] transition-all duration-700 py-2 p-3 text-2xl bg-background border-green-500 dark:border-green-200/50 border-2 w-fit sticky left-3 top-[75px] rounded-lg"
          >
            سورة {quranV2[Number(surahName) - 1].surahNameArabic}
          </div>
        </div>

        <section
          ref={ref}
          className="mb-2 pb-[70px] text-center p-2"
          style={{ fontFamily: "othmany" }}
        >
          {surahs.data.surahs[Number(surahName) - 1].ayahs.map(
            (ayah: AyahType, idx: number) => {
              return (
                <section className="inline">
                  <div
                    data-juz={String(ayah.juz)}
                    onClick={() => handelClickToAyahs(ayah.number, idx)}
                    id={(idx + 1).toString()}
                    style={{ fontSize }}
                    className={`cursor-pointer text-foreground transition leading-[1.8] w-full inline ${
                      currentAyah === +ayah.number
                        ? "bg-green-200 text-black!"
                        : ""
                    }`}
                  >
                    {ayah.text.split(" ").map((el, i) =>
                      mark[el] ? (
                        <span
                          className="inline-flex"
                          style={{ color: mark[el].color }}
                        >
                          {el}
                        </span>
                      ) : (
                        ` ${el} `
                      )
                    )}
                  </div>

                  <span
                    style={{ fontFamily: "amiri" }}
                    className="size-[50px] rounded-full isolate p-1 text-green-700 dark:text-green-200/50 mx-2 m-1 border-solid border-2 border-green-700 dark:border-green-200/50 inline-flex text-center items-center justify-center text-2xl"
                  >
                    {ayah.number.toLocaleString("ar-eg")}
                  </span>

                  {suraah.ayahs[idx]?.juz <
                    suraah.ayahs[idx + 1]?.juz && (
                    <JuzItem
                      juzNum={(ayah?.juz + 1).toLocaleString("ar-eg") + ""}
                    />
                  )}

                  {suraah.ayahs[idx]?.page <
                    suraah.ayahs[idx + 1]?.page && (
                    <div
                      style={{
                        borderTopColor:
                          themes[parseInt(theme!.split("-")?.[1]) - 1]
                            ?.border,
                        borderBottomColor:
                          themes[parseInt(theme!.split("-")?.[1]) - 1]
                            ?.border,
                      }}
                      className="my-4 border-y-2 border-y-green-500 dark:border-y-green-200/50"
                    >
                      <div
                        style={{ fontFamily: "amiri" }}
                        className="mx-auto text-foreground flex items-center justify-center my-2 size-[40px] text-xl p-3 sticky transition-all duration-700 top-[3px] bg-background text-center rounded-[50%] border-2 border-solid border-green-200/50 isolate z-[1]"
                      >
                        {Number(ayah.page_number).toLocaleString("ar-eg")}
                      </div>
                    </div>
                  )}
                </section>
              );
            }
          )}

          {surahName === "114" && <EndDuaa font={fontSize} />}
        </section>
      </Suspense>

      <ScrollToTop />
    </>
  );
};

export function JuzItem({
  juzNum,
  style,
  children,
  classname,
}: {
  font?: number;
  juzNum: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  classname?: string;
}) {
  return (
    <>
      {children ? (
        <div
          className={cn(
            "sticky top-[-2px] -right-8 z-[99] border-green-500 dark:border-green-200/50 border",
            classname
          )}
          style={{ fontFamily: "othmany" }}
        >
          <Separator />

          <div
            style={style}
            className="mx-auto rounded-lg items-center justify-center text-secondary-foreground text-xl p-3 border-green-500 dark:border-green-200/50 border-2 duration-700 bg-background flex gap-1 text-center z-[9] transition-all py-2 pt-3 sticky top-[65px]"
          >
            <span className="dark:bg-green-200/50 bg-[#d4b47733] size-5 max-sm:w-2/3 w-1/4 animate-pulse" />
          </div>

          <Separator />
          {children}
        </div>
      ) : (
        <div
          className={cn("sticky top-[90px] -right-2 max-sm:right-8 z-99 w-fit ", classname)}
          style={{ fontFamily: "amiri" }}
        >
          <Separator />

          <div
            style={style}
            className="mx-auto rounded-lg items-center justify-center text-secondary-foreground text-3xl p-3 border-green-500 dark:border-green-200/50 border-2 duration-700 bg-background flex gap-1 text-center z-[9] transition-all py-2 pt-3 sticky top-[65px]"
          >
            الجزء {juzNum}
          </div>

          <Separator />
        </div>
      )}
    </>
  );
}

export function EndDuaa({
  font,
  title,
}: {
  title?: string;
  font: number;
}) {
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

interface SimilersProps {
  isSimilersOpen: boolean;
  surahNumber: number;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function Similers({
  isSimilersOpen,
  surahNumber,
  setIsOpen,
}: SimilersProps) {
  return (
    <>
      <AnimatePresence key="similars">
        {isSimilersOpen && (
          <ContentViewerPopup>
            <Suspense fallback={<Loader />}>
              <Simillars
                isOpen={isSimilersOpen}
                setOpen={setIsOpen}
                surahNumber={surahNumber}
              />
            </Suspense>
          </ContentViewerPopup>
        )}
      </AnimatePresence>
    </>
  );
}

export function Tafsir({
  isTafsirOpen,
  setIsTafsirOpen,
}: {
  isTafsirOpen: boolean;
  setIsTafsirOpen: Dispatch<SetStateAction<boolean>>;
}) {
  let { id: surahName } = useParams<{ id: string }>();

  const tafsirSurah = useMemo<string[]>(
    () =>
      tafsirat
        .reduce((el, acc) => el.concat(acc), [])
        .map((el: TafserItem) => [
          el?.ayah_url?.slice(1),
          el?.text,
        ])
        .filter((el: string[]) => el[0]?.split("/")[1] === surahName),
    [surahName]
  ).sort(
    (el, el2) => +el[0].split("/")[2] - +el2[0].split("/")[2]
  );

  const [tafsirAyahNumber, tafsirAyahContent] = [
    tafsirSurah.map(el => el[0].split("/")[2]),
    tafsirSurah.map(el => el[1]),
  ];

  return (
    <>
      <AnimatePresence>
        {isTafsirOpen && (
          <ContentViewerPopup>
            <Suspense fallback={<Loader />}>
              <TafsirPopup
                setIsTafsirOpen={setIsTafsirOpen}
                tafsirSurahAyahs={tafsirAyahNumber}
                tafsirSurah={tafsirAyahContent}
              />
            </Suspense>
          </ContentViewerPopup>
        )}
      </AnimatePresence>
    </>
  );
}

interface SurahSettingsProps {
  searchedAyah: string;
  setSearchedAyah: Dispatch<SetStateAction<string>>;
  fontSize: number;
  setFontSize: (size: number) => void;
  setIsAutoScrolling: Dispatch<SetStateAction<boolean>>;
  isAutoScrolling: boolean;
  filterdAyah: Surah[] | undefined;
  setCurrentAyah: Dispatch<SetStateAction<number | null>>;
}

function SurahSettings({
  setCurrentAyah,
  searchedAyah,
  setSearchedAyah,
  fontSize,
  setFontSize,
  setIsAutoScrolling,
  isAutoScrolling,
  filterdAyah,
}: SurahSettingsProps) {
  return (
    <>
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

      <Button
        variant="secondary"
        onClick={() => setIsAutoScrolling(!isAutoScrolling)}
        className="fixed size-[45px] transition-all duration-700 bottom-[100px] right-4 bg-background text-primary p-[10px] rounded-lg border-solid border-primary border-2 cursor-pointer flex items-center justify-center"
      >
        {!isAutoScrolling ? <Play /> : <Pause />}
      </Button>
    </>
  );
}

interface FontStore {
  fontSize: number;
  setFontSize: (size: number) => void;
}

export const useFontStore = create<FontStore>(set => ({
  fontSize: localStorage.getItem("font_size")
    ? Number(localStorage.getItem("font_size"))
    : 50,

  setFontSize(size) {
    localStorage.setItem("font_size", `${size}`);
    set({ fontSize: size });
  },
}));

export default memo(SurahText);
