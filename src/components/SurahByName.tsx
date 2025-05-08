import axios, { AxiosResponse } from "axios";
import { Surah } from "../types/quranSurahs";
import { useFetchQuery } from "../hooks/useFetchQuery";
import Loader from "./Loader";
import { Link } from "react-router";
import SearchBox from "./SearchBox";
import { ReactNode, useContext, useEffect, useState, } from "react";
import SearchInSurahsContext, { SearchInSurahsContext as SearchContext } from "../context/SearchInSurahsContext";

const SurahByName = () => {
    const [filter, setFilter] = useState<Surah[] | undefined>(undefined)
    const { setValue, value } = useContext(SearchContext)
    const getSurahs = async () => {
        try {
            const data: AxiosResponse<Surah[]> = await axios.get(`https://alquran.vip/APIs/surahs`);
            return data?.data
        } catch (err) {
            throw new Error(err as any)
        }
    }
    const { data, isLoading } = useFetchQuery<Surah[]>(getSurahs, "quran-surahs");
    useEffect(() => {
        setFilter(data?.filter(el => el.name_ar.includes(value)))
    }, [value])
    return (
        <section>
            <h2 className="font-bold text-xl border-solid border-2 border-transparent border-b-[#eee] pb-5 pr-3"> سور القران</h2>
            <SearchBox setFilter={setValue} />
            <section className="grid md:grid-cols-4  max-md:grid-cols-2 max-sm:grid-cols-1 gap-">
                {isLoading && <Loader />}
                {!value ? data?.map(item => (
                    <Link to={`${item.id}`}
                        className="pb-4 mt-3 rounded-lg cursor-pointer flex-col gap-2 justify-center border-solid border-[2px] mx-3 border-green-400"
                    >
                        <section
                            className="px-3 font-bold text-md max-sm:text-sm border-solid border-2 border-transparent border-b-green-400 pt-2 pb-3"
                        >
                            {item.name_ar}
                        </section>
                        <section className="px-3 mt-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    عدد اياتها
                                </div>
                                <span
                                    className="size-[30px] rounded-md p-3  text-white bg-green-400 flex items-center justify-center text-sm"
                                >
                                    {` ${item.ayat_count}`}
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
                )) : filter?.length ? filter!?.map(item => (
                    <Link to={`${item.id}`}
                        className="pb-4 mt-3 rounded-lg cursor-pointer flex-col gap-2 justify-center border-solid border-[2px] mx-3 border-green-400"
                    >
                        <section
                            className="px-3 font-bold text-md max-sm:text-sm border-solid border-2 border-transparent border-b-green-400 pt-2 pb-3"
                        >
                            {item.name_ar}
                        </section>
                        <section className="px-3 mt-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    عدد اياتها
                                </div>
                                <span
                                    className="size-[30px] rounded-md p-3  text-white bg-green-400 flex items-center justify-center text-sm"
                                >
                                    {` ${item.ayat_count}`}
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
                )) : <h3> لا توجد نتائج!</h3>}
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