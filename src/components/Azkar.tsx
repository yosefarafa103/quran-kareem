import { useContext, useState } from "react";
import azkar from "../data/azkar.json"
import i18n from "../lib/i18n";
import { AnimatePresence, motion } from "framer-motion";
import { Zekr } from "../types/Azkar";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../constants/colors";
import { Button } from "./ui/button";
import { replaceNumsEnglishToArabic } from "@/utils/helpers";
const Azkar = () => {

    const [tab, setTab] = useState(0);
    const filter: Zekr[] = azkar[Object.keys(azkar)[tab]] as any
    return (
        <>
            <div className="flex items-center gap-3 whitespace-nowrap overflow-x-scroll pb-4 sticky top-0 bg-background z-[10] p-2">
                {Object.keys(azkar).map((item, i) => (
                    <Button onClick={() => setTab(i)} className={`p-3 cursor-pointer  transition-all duration-500 rounded-md hover:bg-primary ${tab === i ? "!bg-[#bbb] text-white" : ""}`}>{i18n.t(item)}</Button>
                ))}
            </div>
            <section
                className="grid md:grid-cols-4 pt-7 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
            </section>
            <section className="flex flex-wrap gap-4 p-5">
                {filter.map((item) => (
                    <ZekrItem  {...item} />
                ))}
            </section>
        </>
    )
}
type Z = Zekr & { handlingClickFN: () => void, }
export function ZekrItem({ count, text, handlingClickFN, }: Z) {
    const [clicks, setClicks] = useState(0);
    return (
        <>
            <motion.section
                whileTap={{ scale: count - clicks > 0 ? 1.05 : 1 }}
                onClick={() => {
                    if (count - clicks > 0) {
                        setClicks(clicks + 1)
                    }
                    if (handlingClickFN) {
                        handlingClickFN()
                    }
                }}

                className={`relative block px-3 font-bold text-md max-sm:text-sm border-solid border-2 border-green-400 p-4 rounded-lg my-4 ${count - clicks <= 0 && "hidden"} mb-[65px] select-none w-full`}
                style={{ fontSize: localStorage.getItem("font_size") + "px", }}
            >
                <div className={`${count - clicks <= 0 ? "opacity-[0.5]" : ""} text-center `}>
                    {text}
                </div>
                <span className="size-[40px] rounded-[50%] p-2 text-green-500 m-2 border-solid border-2 border-green-400 inline-flex items-center justify-center text-[22px] absolute top-full right-0">{replaceNumsEnglishToArabic((count - clicks) + "")}</span>
                <AnimatePresence>
                    {count - clicks === 0 &&
                        <motion.span
                            initial={{ y: 12, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            style={{ fontSize: localStorage.getItem("font_size") + "px", }}

                            className="size-[30px] w-[50px] py-4 bg-green-400 text-white m-2 border-solid inline-flex items-center justify-center text-[18px] absolute top-full left-0">تم</motion.span>
                    }
                </AnimatePresence>
            </motion.section>
        </>
    )
}
export default Azkar