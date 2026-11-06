import similars from "@/data/similar.json"
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Button } from "./ui/button";
import surahs from "@/data/mushafs-1.json"

interface SimilarObj {
    data: Similar[]
}

interface Similar extends SimilarObj {
    surah: number, ayah: number, similar: SimilarItem[]
}
interface SimilarItem {
    notes: string;
    ayahs: SimilarItemAyah[]
}
interface SimilarItemAyah {
    info: {
        id: number;
        juz: number;
        marker: string;
        number: number;
        page_number: number;
        surah: { id: 1, name: string, coded_name: string, number_of_ayahs: number };
        surah_id: number
        text: string
    }
}
interface Props {
    surahNumber: number, isOpen: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>;
}


const Simillars = ({ surahNumber, setOpen, isOpen }: Props) => {
    const simillars: Similar[] = (similars as Similar).data.sort((a, b) => a.surah - b.surah)
    const [surahSimilars] = useState((simillars).filter(el => el.surah == surahNumber));
    return (
        <>
            <div className="flex justify-between border-solid border-2 border-transparent border-b-green-300 py-3 pr-3 sticky -top-4 right-0 bg-background! z-[999] p-4">
                <h2 className="font-bold text-xl ">
                    المتشابهات ( {surahNumber.toLocaleString("ar-eg")} )
                </h2>
                <Button onClick={() => setOpen(!isOpen)} variant='outline'>رجوع</Button>
            </div>
            <div className="h -[calc(85vh-30px)] p-5">
                {/* <List rowHeight={300} overscanRowCount={5} width={document.body.clientWidth - 100} height={document.body.clientHeight / 2} rowCount={surahSimilars.length} rowRenderer={(args) => SimilerItem({ ...args, similers: surahSimilars })} >
                </List> */}
                {surahSimilars.map(({ surah, ayah, similar }) => (
                    <section className="relative after:absolute after:h-full after:w-0.5 after:bg-green-400 after:right-[-10px] after:top-1 z-10 after:z-[-2]">
                        <div className="text-green-700 dark:text-green-300 mb-3">
                            {surahs.data.surahs[surah - 1].name} ({ayah.toLocaleString('ar-eg')})
                        </div>
                        <div>
                            <h4>
                                <span className="text-lg">{surahs.data.surahs[surah - 1].ayahs[ayah - 1].text}</span>
                            </h4>
                            <div className="pr-3">
                                <h3 className="mb-2">متشابهاتها</h3>
                                {similar.map(item => (
                                    <div className="relative p-2 bg-green-700/10 transition duration-500 mb-4 rounded-lg -z-1">
                                        <span className="text-green-700 dark:text-green-300">
                                            {item.notes}
                                        </span>
                                        <span className="inline-flex gap-1 border border-green-400 border-l-0 border-t-0 absolute sm:hidden size-[1px] h-[calc(100%-90px)] right-2 top-16 rotatse-90 " />
                                        {item.ayahs.map((e, idx) => (
                                            <section className="pr-10 -mb-2">
                                                <div className="flex gap-2 items-center flex-wrap relative">
                                                    {idx == 0 ?
                                                        <span className="inline-flex gap-1 relative after:absolute after:h-0.5 after:w-[30px] after:bg-green-400 after:-right-10 after:rounded-b-2xl after:top-[-2px] z-[666666] after:z-[-1]" />

                                                        :

                                                        <span className="inline-flex gap-1 border border-green-400 border-l-0 border-t-0 absolute size-[30px] h-16 -right-10 -top-7 rotatse-90 rounded-br-2xl" />
                                                    }
                                                    <span>
                                                        {e.info.surah.name}
                                                    </span>-
                                                    <span className="border px-2 py-0.5 text-2xl border-green-600 rounded-sm my-2" style={{ fontFamily: "othmany" }}>{e.info.text} </span>
                                                </div>

                                            </section>
                                        ))}
                                    </div>

                                ))}

                            </div>
                        </div>
                    </section>
                ))}
            </div>

        </>
    )
}

export default Simillars
