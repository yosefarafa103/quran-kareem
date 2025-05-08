import { SetStateAction, Dispatch, useState, useContext, } from "react"
import { Theme } from "../types/theme"
import { ThemeContext } from "../context/ThemeContext"
import { colors } from "../constants/colors"

const SearchBox = ({ setFilter }: { setFilter: Dispatch<SetStateAction<string>> }) => {
    const [value, setValue] = useState("")
    const { theme } = useContext<Theme>(ThemeContext)
    return (
        <section style={{ backgroundColor: theme === "Dark" ? `${colors.dark.green}` : colors.light.green, color:  theme === "Light" ? colors.dark.text : colors.light.text }}  className={`flex items-center gap-3 m-4 sticky transition-all duration-500 top-2 ${theme === "Dark" ? "black-bg" : "bg-[#f7f7f7]"}] rounded-xl p-3`}>
            <input
                onChange={(e) => setValue(e.target.value)}
                className="p-2 border-solid grow border-[#ddd] border-[1px] outline-0 rounded-md"
                type="text"
                placeholder="سوره ال..."
            />
            <button
                onClick={() => setFilter(value)}
                className={`px-5 py-2 cursor-pointer duration-500 transition-all duration-500 ${theme === "Dark" ?  "border-light": "border-dark"} bg-[#${theme === "Dark" ? "fff" : "eee"}] rounded-md font-bold`}
            >
                ابحث
            </button>
        </section>
    )
}

export default SearchBox