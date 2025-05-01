import { SetStateAction, Dispatch, useState, } from "react"

const SearchBox = ({ setFilter }: { setFilter: Dispatch<SetStateAction<string>> }) => {
    const [value, setValue] = useState("")

    return (
        <section className="flex items-center gap-3 m-4 sticky top-2 bg-[#f7f7f7] rounded-xl p-3">
            <input
                onChange={(e) => setValue(e.target.value)}
                className="p-2 border-solid grow border-[#ddd] border-[1px] outline-0 rounded-md"
                type="text"
                placeholder="سوره ال..."
            />
            <button
                onClick={() => setFilter(value)}
                className="px-5 py-2 cursor-pointer bg-[#eee] rounded-md font-bold"
            >
                ابحث
            </button>
        </section>
    )
}

export default SearchBox