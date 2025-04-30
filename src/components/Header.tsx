import { Link } from "react-router-dom";
import mosque from "../assets/images/mosque.png"
interface LinkType {
    route: string;
    name: string
}
function Header() {
    const LINKS: LinkType[] = [{ name: "القران الكريم", route: '/quran' }, { name: "مواقيت الصلاة", route: '/prayer-times' }, { name: "الاذكار", route: '/azkar' }]
    return (
        <section className="flex items-center justify-between max-md:px-4 px-[75px] py-2 bg-green-50 border-solid border-2 border-transparent border-b-green-300">
            <Link to={`/`}>
                <img src={mosque} className="size-[50px]" loading="lazy" alt="" />
            </Link>
            <div className="flex items-center gap-3">
                {LINKS?.map(lnk => (
                    <Link to={`${lnk.route}`}>{lnk.name}</Link>
                ))}
            </div>
        </section>
    )
}

export default Header