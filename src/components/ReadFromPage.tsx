import { memo, useMemo, useState } from "react"
import { Link } from "react-router";

const ReadFromPage = () => {
    const [filterdPage, setFilterdPage] = useState<string | null>(null);
    const [page, setPage] = useState("");

    const pages = useMemo(() => new Array(604).fill("").map((_, i) => (i < 10 ? `00${i + 1}` : i < 100 ? `0${i + 1}` : `${i + 1}`)), []);
    console.log(filterdPage);
    return (
        <div>
            <section className="flex items-center gap-3">
                <input
                    onChange={(e) => setPage(e.target.value)}
                    className="p-2 border-solid grow border-[#ddd] border-[1px] outline-0 rounded-md"
                    type="text"
                    placeholder="ادخل رقم الصفحة"
                    value={page}
                />
                <button
                    onClick={() => setFilterdPage(page)}
                    className="px-5 py-2 cursor-pointer bg-[#eee] rounded-md font-bold"
                >
                    ابحث
                </button>
            </section>
            <section className="flex flex-wrap gap-3 justify-center px-1">
                {pages.map((pageNumber, i) => (
                    <Link to={`${(i < 10 ? `00${i + 1}` : i < 100 ? `0${i + 1}` : `${i + 1}`)}`}
                        key={i}
                        className="px-10 py-4 rounded-lg shadow-md cursor-pointer"
                    >
                        الصفحة رقم <br />
                        {pageNumber}
                    </Link>
                ))}
            </section>
        </div>
    )
}

export default memo(ReadFromPage);