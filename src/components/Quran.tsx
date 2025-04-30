import { Link, useNavigate } from "react-router"

const Quran = () => {
    const navigate = useNavigate()
    return (
        <div>
            <section className="flex items-center gap-2">
                <Link to={`by-surahs`} className="p-3 cursor-pointer bg-[#eee] rounded-md hover:bg-[#ddd]">قراءه عن طريق الايات</Link>
                <Link to={`by-page`} className="p-3 cursor-pointer bg-[#eee] rounded-md hover:bg-[#ddd]">قراءه عن طريق الصفحات</Link>
                {localStorage.getItem("last_ayah") &&
                    <div onClick={() => {
                        const localS = JSON.parse(localStorage.getItem("last_ayah")!)
                        navigate(`by-surahs/${localS.surahName}?ayah=${localS.ayahNumber}`)
                    }} className="p-3 cursor-pointer bg-[#eee] rounded-md hover:bg-[#ddd]">اخر اية تم قرائتها</div>
                }
            </section>
        </div>
    )
}

export default Quran