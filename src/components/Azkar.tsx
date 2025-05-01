import { useState } from "react";
import azkar from "../data/azkar.json"
import i18n from "../lib/i18n";
import { Zekr, Zekr } from "../types/Azkar";
import { AnimatePresence, motion } from "framer-motion";
const Azkar = () => {
    const [tab, setTab] = useState(0);
    const filter: Zekr[] = azkar[Object.keys(azkar)[tab]]
    console.log();

    return (
        <>
            <div className="flex items-center gap-3 whitespace-nowrap overflow-x-scroll pb-4">
                {Object.keys(azkar).map((item, i) => (
                    <div onClick={() => setTab(i)} className={`p-3 cursor-pointer bg-[#eee] rounded-md hover:bg-[#ddd] ${tab === i ? "!bg-[#000] text-white" : ""}`}>{i18n.t(item)}</div>
                ))}
            </div>
            <section
                className="grid md:grid-cols-4 pt-7 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
                {/* <div className="font-bold text-xl border-solid border-2 border-transparent border-b-[#eee] pb-5 pr-3">{i18n.t(Object.keys(azkar)[tab])}</div> */}
            </section>
            {filter.map((item) => (
                <Zekr  {...item} />
            ))}
        </>
    )
}

export function Zekr({ count, text }: Zekr) {
    const [clicks, setClicks] = useState(0);
    return (
        <>
            <motion.section
                whileTap={{ scale: count - clicks > 0 ? 1.05 : 1 }}
                onClick={() => {
                    if (count - clicks > 0) {
                        setClicks(clicks + 1)
                    }
                }}
                className={`relative px-3 font-bold text-md max-sm:text-sm border-solid border-2 border-green-400 p-4 rounded-lg mt-2 ${count - clicks <= 0 && "hidden"} mb-[55px]`}
            >
                <div className={`${count - clicks <= 0 ? "opacity-[0.5]" : ""} text-center`}>
                    {text}
                </div>
                <span className="size-[40px] rounded-[50%] p-2 text-green-500 m-2 border-solid border-2 border-green-400 inline-flex items-center justify-center text-[22px] absolute top-full right-0">{count - clicks}</span>
                <AnimatePresence>
                    {count - clicks === 0 &&
                        <motion.span
                            initial={{ y: 12, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="size-[30px] w-[50px] py-4 bg-green-400 text-white m-2 border-solid inline-flex items-center justify-center text-[18px] absolute top-full left-0">تم</motion.span>
                    }
                </AnimatePresence>
            </motion.section>
        </>
    )
}
export default Azkar