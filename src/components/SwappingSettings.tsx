import { motion, useDragControls } from "framer-motion";
import { Dispatch, SetStateAction, useContext } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { ThemeContext } from "@/context/ThemeContext";
import { Theme } from "@/types/theme";
import { themes } from "@/constants/variables";
type stateHandler<T> = Dispatch<SetStateAction<T>>;
interface Props {
  surahName: number;
  setFontSize: stateHandler<number>;
  fontSize: number;
  setIsTafsirOpen: stateHandler<boolean>;
}
const SwappingSettings = ({
  setFontSize,
  fontSize,
  setIsTafsirOpen,
  surahName,
}: Props) => {
  // const controlls = useDragControls();
  const theme = useContext<Theme | null>(ThemeContext);
  const themeStyleProps = {
    borderColor: themes[+theme?.theme!.split("-")?.[1] - 1]?.secondaryColor,
    backgroundColor: themes[+theme?.theme!.split("-")?.[1] - 1]?.primaryColor,
  };
  return (
    <motion.div
      dragDirectionLock={true}
      drag
      style={{
        borderTopColor:
          themes[+theme?.theme?.split("-")?.[1] - 1]?.secondaryColor,
      }}
      onDrag={(e: DragEvent) => console.log(e.y)}
      dragConstraints={{ bottom: 0, top: -220, left: 0, right: 0 }}
      className="sm:hidden transition-all duration-300 ease-out fixed h-max pb-5 -bottom-[235px] left-0 bg-background w-full z-[10] border-green-500 border-2"
    >
      <motion.div
        style={{
          backgroundColor:
            themes[+theme?.theme?.split("-")?.[1] - 1]?.secondaryColor,
        }}
        className="absolute w-[35%] h-1 bg-green-500 top-3 left-1/2 -translate-x-1/2 rounded-2xl transition-all duration-700"
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
              setFontSize((current) => (current -= 2));
            }
          }}
          className="max-sm:text-sm px-[15px] py-2 mx-2 text-lg cursor-pointer rounded-lg border-solid border-background border-2 w-[95%] dark:bg-black dark:text-green-500 dark:border-green-500"
        >
          تصغير الخط
        </Button>
        <Button
          style={{
            backgroundColor: themeStyleProps.borderColor,
          }}
          onClick={() => setFontSize((current) => (current += 2))}
          className="max-sm:text-sm px-[15px] w-[95%] py-2 mx-2 text-lg cursor-pointer rounded-lg border-solid border-background border-2 dark:bg-black dark:text-green-500 dark:border-green-500"
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
            className="max-sm:text-sm px-[15px] py-2 mx-2 bg-[#ddd] text-lg cursor-pointer rounded-lg border-solid border-background border-2 dark:bg-black dark:text-green-500 dark:border-green-500"
          >
            السورة السابقة
          </Link>
        </Button>
        <Button
          style={{
            backgroundColor: themeStyleProps.borderColor,
          }}
          onClick={() => {
            setIsTafsirOpen((prev) => !prev);
          }}
          className="max-sm:text-sm w-[95%] px-[15px] py-2 mx-2 text-lg cursor-pointer rounded-lg border-solid border-background border-2  dark:bg-black dark:text-green-500 dark:border-green-500"
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
            to={`/quran/by-surahs/${
              surahName < 114 ? `${+surahName + 1}` : ""
            }`}
            className="max-sm:text-sm w-[95%] px-[15px] py-2 mx-2 bg-[#ddd] text-lg cursor-pointer rounded-lg border-solid border-background border-2 dark:bg-black dark:text-green-500 dark:border-green-500"
          >
            السورة التالية
          </Link>
        </Button>
      </section>
    </motion.div>
  );
};

export default SwappingSettings;
