import { Surah } from "../types/quranSurahs";
import { Link } from "react-router";
import SearchBox from "./SearchBox";
import { ReactNode, useContext, useEffect, useState, } from "react";
import SearchInSurahsContext, { SearchInSurahsContext as SearchContext } from "../context/SearchInSurahsContext";
import { S } from "@/constants/quran";
import { quran } from "@/constants/quran"
import { useFilterAyah } from "@/hooks/useFilterAyah";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import FormSearchAyahs from "./FormSearchAyahs";
import { removeTashkil, replaceNumsEnglishToArabic } from "@/utils/helpers";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import FilterPopupWrapper from "./FilterPopupWrapper";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
const SurahByName = () => {
    const [filter, setFilter] = useState<S[] | null>()
    const [isSearched, setIsSearched] = useState<boolean>(false)
    const { setValue, value } = useContext(SearchContext)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [searchedAyah, setSearchedAyah] = useState<string>("");
    const { filterdData } = useFilterAyah({ isInSurah: false, searchedAyah })
    useEffect(() => {
        setFilter(quran?.filter((el) => removeTashkil(el.name)?.includes((value))))
        if (isOpen) {
            setIsSearched(true)
        }
    }, [isOpen]);
    useEffect(() => {
        setFilter(quran?.filter((el) => removeTashkil(el?.name)?.includes(value)), value);
    }, [value])


    return (
        <section>
            <AnimatePresence>
                {isSearched &&
                    <FilterPopupWrapper
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                {isSearched ?
                                    ` 
                                                تم العثور علي
                                                ${replaceNumsEnglishToArabic(filterdData?.length + "")}  
                                                نتائج
                                            `
                                    : "لم يتم العثور علي نتائج"}
                            </div>
                            <Button variant={"default"} onClick={() => {
                                setSearchedAyah("")
                                setIsSearched(false)
                            }}>رجوع</Button>
                        </div>
                        <Separator />
                        {filterdData?.map(a => (
                            <Collapsible className="relative after:absolute after:h-full after:w-1 after:bg-green-400 after:right-[8px] after:top-0 z-10 after:z-[-2] ">
                                <CollapsibleTrigger>
                                    <div className="flex gap-2 text-foreground cursor-pointer" key={a.text}>
                                        <span className="size-[10px] rounded-[50%] p-2 bg-green-600 border-solid border-2 border-green-400 inline-flex items-center justify-center !text-[14px]">{replaceNumsEnglishToArabic(a?.numberInSurah?.toString())}</span>
                                        {a.name}
                                    </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    {a.data?.map(e => (
                                        <div className="flex gap-1 pr-7 my-5 relative after:absolute after:h-1 after:w-[20px] after:bg-green-400 after:right-[8px] after:top-2.5 z-10 after:z-[-1]">
                                            <span className="size-[30px] rounded-[50%] p-2 text-green-500 border-solid border-2 border-green-400 inline-flex items-center justify-center !text-[14px] bg-background">{replaceNumsEnglishToArabic(e?.numberInSurah?.toString())}</span>
                                            <p className="text-[16px] "> {e?.text} </p>
                                        </div>
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                    </FilterPopupWrapper>
                }
            </AnimatePresence>
            <Dialog open={isOpen} >
                <DialogTrigger onClick={() => setIsOpen(!isOpen)}>
                    <div className={`fixed size-[45px] transition-all duration-700 bottom-[20px] right-4 text-primary p-[10px] rounded-lg border-solid border-[#000] border-2 cursor-pointer flex bg-background items-center justify-center `}>
                        <Search />
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>
                        استخراج اية من القران
                    </DialogTitle>
                    <FormSearchAyahs setIsSearched={setSearchedAyah} setSearchedAyah={setSearchedAyah} setOpen={setIsOpen} isOpen={isOpen} />
                </DialogContent>
            </Dialog>
            <h2 className="font-bold text-xl border-solid border-2 border-transparent border-b-[#eee] pb-5 pr-3"> سور القران</h2>
            <SearchBox setFilter={setValue} />
            <section className="grid md:grid-cols-4  max-md:grid-cols-2 max-sm:grid-cols-1 gap-">
                {/* {isLoading && <Loader />} */}
                {!filter?.length && value.length > 0 ? "لم يتم العثور علي نتائج" : filter!?.map(item => (
                    <Link to={`${item?.number}`}
                        className="pb-4 mt-3 rounded-lg cursor-pointer flex-col gap-2 justify-center border-solid border-[2px] mx-3 border-green-400"
                    >
                        <section
                            className="px-3 font-bold text-md max-sm:text-sm border-solid border-2 border-transparent border-b-green-400 pt-2 pb-3"
                        >
                            {item?.name}
                        </section>
                        <section className="px-3 mt-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    عدد اياتها
                                </div>
                                <span
                                    className="size-[30px] rounded-md p-3  text-white bg-green-400 flex items-center justify-center text-sm"
                                >
                                    {` ${item.ayahs.length}`}
                                </span>
                            </div>
                            <div
                                className="flex items-center justify-between"
                            >
                                <div>نوعها</div>
                                <div
                                    className="rounded-md px-3 py-1.5 text-white bg-green-400 flex items-center justify-center text-sm mt-3"
                                >
                                    {item.type === "Meccan" ? `  مكية  ` : `  مدنية `}</div>
                            </div>
                        </section>
                    </Link>
                ))}
            </section>
        </section>
    )
}

export default SurahByName

export function Wrapper({ children }: { children: ReactNode }) {
    return <SearchInSurahsContext >
        {children}
    </SearchInSurahsContext>
}