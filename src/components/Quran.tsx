import { useContext } from "react"
import { Link, useNavigate } from "react-router"
import { ThemeContext } from "../context/ThemeContext"

const Quran = () => {
    const { theme } = useContext(ThemeContext)
    const navigate = useNavigate()
    return (
        <div>
            <section className="flex items-center gap-2 whitespace-nowrap max-sm:overflow-x-scroll">
                {[{ name: "قراءه عن طريق الايات", href: "by-surahs" }, { name: "قراءه عن طريق الصفحات", href: "by-page" }].map((el) => (
                    <Link to={`${el.href}`} className={`p-3 text-sm cursor-pointer border-solid border-2 border-transparent rounded-md hover:bg-[#ddd] mt-3 ${theme === "Dark" ? "border-light" : "border-dark"}`}>{el.name}</Link>
                ))}
                {localStorage.getItem("last_ayah") &&
                    <div onClick={() => {
                        const localS = JSON.parse(localStorage.getItem("last_ayah")!)
                        navigate(`by-surahs/${localS.surahName}?ayah=${localS.ayahNumber}`)
                    }} className={`p-3 text-sm cursor-pointer rounded-md hover:bg-[#ddd] mt-3 bg-[${theme === "Dark" ? "#444" : "#eee"}] ${theme === "Dark" ? "border-light" : "border-dark"} `}>اخر اية تم قرائتها</div>
                }
            </section>
        </div>
    )
}

export default Quran