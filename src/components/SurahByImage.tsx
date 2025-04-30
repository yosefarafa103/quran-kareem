import { Link, useParams } from "react-router"


function SurahByImage() {
    const { pageNum } = useParams();

    return (
        <>
            <img className="max-h-[calc(100vh-150px)] mx-auto w-full object-contain" src={`https://alquran.vip/APIs/quran-pages/${pageNum}.png`} alt="" />
            <div className="flex items-center gap-4 mt-5 justify-center">
                <Link to={`/quran/by-page/${`${(+pageNum! < 10 ? `00${+pageNum! - 1}` : +pageNum! < 100 ? `0${+pageNum! - 1}` : `${+pageNum! - 1}`)}`}`} className="py-2 px-5 bg-[#25db5b] hover:bg-[#2f8048] cursor-pointer text-white rounded-lg">السابق</Link>
                <Link to={`/quran/by-page/${`${(+pageNum! < 10 ? `00${+pageNum! + 1}` : +pageNum! < 100 ? `0${+pageNum! + 1}` : `${+pageNum! + 1}`)}`}`} className="py-2 px-5 bg-[#25db5b] hover:bg-[#2f8048] cursor-pointer text-white rounded-lg">التالي</Link>
            </div>
        </>
    )
}

export default SurahByImage