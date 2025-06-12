import { lazy, useContext, Suspense, useEffect } from "react"
import { Link, useNavigate } from "react-router"
import { ThemeContext } from "../context/ThemeContext"
import Loader from "./Loader"
const AllSurahsInOnePlace = lazy(() => import("./AllSurahsInOnePlace"))
// import AllSurahsInOnePlace from 

const Quran = () => {
    const { theme } = useContext(ThemeContext)
    const navigate = useNavigate();
    console.log(location.hash);
    useEffect(() => location.hash = "", [])

    return (
        <div className="min-h-[100svh]">
            <section className="flex items-center gap-2 whitespace-nowrap max-sm:overflow-x-scroll mb-4 overflow-x-scroll">
                {[{ name: "قراءه عن طريق السور", href: "by-surahs" }, { name: "قراءه عن طريق الصفحات", href: "by-page" }].map((el) => (
                    <Link to={`${el.href}`} className={`p-3 text-sm cursor-pointer border-solid border-2 border-transparent rounded-md hover:bg-[#ddd] mt-3 ${theme === "Dark" ? "border-light" : "border-dark"}`}>{el.name}</Link>
                ))}
                {localStorage.getItem("last_ayah") &&
                    <div onClick={() => {
                        const localS = JSON.parse(localStorage.getItem("last_ayah")!)
                        navigate(`by-surahs/${localS.surahName}?ayah=${localS.ayahNumber}`)
                    }} className={`p-3 text-sm cursor-pointer rounded-md hover:bg-[#ddd] mt-3 bg-background border-background`}>اخر اية تم قرائتها</div>
                }
                {localStorage.getItem("last_ayah_in_moshaf") &&
                    <div onClick={() => {
                        location.hash = localStorage.getItem("last_ayah_in_moshaf")
                    }} className={`p-3 text-sm cursor-pointer rounded-md hover:bg-[#ddd] mt-3 bg-background border-background `}>انقلني الي اخر اية تم قرائتها هنا 👇</div>
                }
            </section>
            <Suspense fallback={<Loader />}>
                <AllSurahsInOnePlace />
            </Suspense>
        </div>
    )
}

export default Quran