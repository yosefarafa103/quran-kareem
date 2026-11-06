import { memo, useMemo, } from "react"
import { Link } from "react-router";

const ReadFromPage = () => {
    // const [filterdPage, setFilterdPage] = useState<string | null>(null);
    // const [page, setPage] = useState("");

    const pages = useMemo(() => new Array(604).fill("").map((_, i) => (i < 10 ? `00${i + 1}` : i < 100 ? `0${i + 1}` : `${i + 1}`)), []);
    return (
        <>

            <section className="flex flex-wrap gap-3 justify-center px-1 mt-5">
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
        </>
    )
}

export default memo(ReadFromPage);