import { motion, useDragControls } from "framer-motion";
import { Dispatch, SetStateAction, useContext } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { themes } from "@/constants/variables";
import { useThemeStore } from "@/stores/themeStore";
type stateHandler<T> = Dispatch<SetStateAction<T>>;
interface Props {
  surahName: number;
  setFontSize: (size: number) => void,
  fontSize: number;
  setIsTafsirOpen: stateHandler<boolean>;
  setIsSimilersOpen: stateHandler<boolean>;
}
const SwappingSettings = ({
  setFontSize,
  fontSize,
  setIsTafsirOpen,
  surahName,
  setIsSimilersOpen
}: Props) => {
  // const controlls = useDragControls();
  const { theme } = useThemeStore();

  const themeStyleProps = {
    borderColor: themes[(parseInt(theme!.split("-")?.[1])) - 1]?.secondaryColor,
    backgroundColor: themes[(parseInt(theme!.split("-")?.[1])) - 1]?.primaryColor,
  };
  return (
    <motion.div
      dragDirectionLock={true}
      drag
      style={{
        backgroundColor: themes[(parseInt(theme!.split("-")?.[1])) - 1]?.border,
        borderTopColor: themes[(parseInt(theme!.split("-")?.[1])) - 1]?.secondaryColor,
      }}
      dragConstraints={{ bottom: 0, top: -280, left: 0, right: 0 }}
      className="sm:hidden transition-all duration-300 ease-out fixed  pb-5 -bottom-[280px] left-0 bg-background w-full z-[10] border-[var(--borderColor)] border-2"
    >
      <motion.div

        className="absolute w-[35%] h-1 bg-[var(--borderColor)] top-3 left-1/2 -translate-x-1/2 rounded-2xl transition-all duration-700"
      >
        <Separator className="" />
      </motion.div>
      <section className="flex flex-col gap-1 mt-12">
        <Button
          style={{
            backgroundColor: themeStyleProps.borderColor,
          }}
          onClick={() => {
            if (fontSize >= 18) {
              setFontSize(fontSize - 2);
            }
          }}
          className="max-sm:text-sm px-[15px] py-2 mx-2 text-lg cursor-pointer rounded-lg border-solid border-background border-2 w-[95%] dark:bg-black dark:text-[var(--borderColor)]  dark:border-[var(--borderColor)] "
        >
          تصغير الخط
        </Button>
        <Button
          style={{
            backgroundColor: themeStyleProps.borderColor,
          }}
          onClick={() => setFontSize(fontSize + 2)}
          className="max-sm:text-sm px-[15px] w-[95%] py-2 mx-2 text-lg cursor-pointer rounded-lg border-solid border-background border-2 dark:bg-black dark:text-[var(--borderColor)]  dark:border-[var(--borderColor)] "
        >
          تكبير الخط
        </Button>
        <Button
          style={{
            backgroundColor: themeStyleProps.borderColor,
          }}
          asChild
          className="w-[95%]"
        >
          <Link
            to={`/quran/by-surahs/${surahName < 114 ? `${surahName - 1}` : ""}`}
            className="max-sm:text-sm px-[15px] py-2 mx-2 bg-[#ddd] text-lg cursor-pointer rounded-lg border-solid border-background border-2 dark:bg-black dark:text-[var(--borderColor)]  dark:border-[var(--borderColor)] "
          >
            السورة السابقة
          </Link>
        </Button>

        <Button
          style={{
            backgroundColor: themeStyleProps.borderColor,
          }}
          onClick={() => setIsSimilersOpen(prev => !prev)}
          className="max-sm:text-sm w-[95%] px-[15px] py-2 mx-2 text-lg cursor-pointer rounded-lg border-solid border-background border-2  dark:bg-black dark:text-[var(--borderColor)]  dark:border-[var(--borderColor)] "
        >
          عرض المتشابهات
        </Button>
        <Button
          style={{
            backgroundColor: themeStyleProps.borderColor,
          }}
          onClick={() => {
            setIsTafsirOpen((prev) => !prev);
          }}
          className="max-sm:text-sm w-[95%] px-[15px] py-2 mx-2 text-lg cursor-pointer rounded-lg border-solid border-background border-2  dark:bg-black dark:text-[var(--borderColor)]  dark:border-[var(--borderColor)] "
        >
          اظهر التفسير
        </Button>
        <Button
          style={{
            backgroundColor: themeStyleProps.borderColor,
          }}
          asChild
        >
          <Link
            to={`/quran/by-surahs/${surahName < 114 ? `${+surahName + 1}` : ""
              }`}
            className="max-sm:text-sm w-[95%] px-[15px] py-2 mx-2 bg-[#ddd] text-lg cursor-pointer rounded-lg border-solid border-background border-2 dark:bg-black dark:text-[var(--borderColor)]  dark:border-[var(--borderColor)] "
          >
            السورة التالية
          </Link>
        </Button>
      </section>
    </motion.div>
  );
};

export default SwappingSettings;
