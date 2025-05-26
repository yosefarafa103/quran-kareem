import { SetStateAction, Dispatch, useState, useContext, } from "react"
import { Theme } from "../types/theme"
import { ThemeContext } from "../context/ThemeContext"
import { colors } from "../constants/colors"

const SearchBox = ({ setFilter }: { setFilter: Dispatch<SetStateAction<string>> }) => {
    const [value, setValue] = useState("")
    const { theme } = useContext<Theme>(ThemeContext)
    return (
        <section style={{ backgroundColor: theme === "Dark" ? `${colors.dark.green}` : colors.light.green, color:  theme === "Light" ? colors.dark.text : colors.light.text }}  className={`flex items-center gap-3 sm:m-4 m-2 sticky transition-all duration-500 top-2 ${theme === "Dark" ? "black-bg" : "bg-[#f7f7f7]"}] rounded-xl p-3`}>
            <input
                onChange={(e) => setValue(e.target.value)}
                className="p-2 border-solid border-[#ddd] border-[1px] outline-0 grow rounded-md"
                type="text"
                placeholder="سوره ال..."
            />
            <button
                onClick={() => setFilter(value)}
                className={`sm:px-5 px-2 py-2 cursor-pointer transition-all duration-500 ${theme === "Dark" ?  "border-light": "border-dark"} bg-[#${theme === "Dark" ? "fff" : "eee"}] rounded-md font-bold`}
            >
                ابحث
            </button>
        </section>
    )
}

export default SearchBox