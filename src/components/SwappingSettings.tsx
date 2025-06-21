
import { motion, useDragControls } from "framer-motion"
import { Dispatch, SetStateAction, useState } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Link } from "react-router";
type stateHandler<T> = Dispatch<SetStateAction<T>>
interface Props {
    surahName: number
    setFontSize: stateHandler<number>, fontSize: number, setIsTafsirOpen: stateHandler<boolean>
}
const SwappingSettings = ({ setFontSize, fontSize, setIsTafsirOpen, surahName }: Props) => {
    const controlls = useDragControls();
    return (
        <motion.div dragDirectionLock={true} drag
            onDrag={(e: DragEvent) => console.log(e.y)}
            dragConstraints={{ bottom: 0, top: -220, left: 0, right: 0 }}
            className="sm:hidden transition-all duration-300 ease-out fixed h-max pb-5 -bottom-[235px] left-0 bg-accent-foreground w-full z-[10] ">
            <motion.div className="absolute w-[35%] h-1 bg-background top-3 left-1/2 -translate-x-1/2 rounded-2xl transition-all duration-700">
                <Separator className="" />
            </motion.div>
            <section className="flex flex-col gap-2 mt-7">

                <Button onClick={() => {
                    if (fontSize >= 18) {
                        setFontSize(current => current -= 2)
                    }
                }} className="max-sm:text-sm px-[15px] py-2 mx-2 text-lg cursor-pointer rounded-lg border-solid border-background border-2 w-[95%]">تصغير الخط</Button>
                <Button onClick={() => setFontSize(current => current += 2)} className="max-sm:text-sm px-[15px] w-[95%] py-2 mx-2 text-lg cursor-pointer rounded-lg border-solid border-background border-2"> تكبير الخط</Button>
                <Button asChild className="w-[95%]">
                    <Link to={`/quran/by-surahs/${surahName < 114 ? `${surahName - 1}` : ""}`} className="max-sm:text-sm px-[15px] py-2 mx-2 bg-[#ddd] text-lg cursor-pointer rounded-lg border-solid border-background border-2"> السورة السابقة</Link>
                </Button>
                <Button onClick={() => { setIsTafsirOpen(prev => !prev); }} className="max-sm:text-sm w-[95%] px-[15px] py-2 mx-2 text-lg cursor-pointer rounded-lg border-solid border-background border-2 ">
                    اظهر التفسير
                </Button>
                <Button asChild>
                    <Link to={`/quran/by-surahs/${surahName < 114 ? `${+surahName + 1}` : ""}`} className="max-sm:text-sm w-[95%] px-[15px] py-2 mx-2 bg-[#ddd] text-lg cursor-pointer rounded-lg border-solid border-background border-2"> السورة التالية</Link>
                </Button>
            </section>
        </motion.div>
    )
}

export default SwappingSettings