import { Link, NavLink } from "react-router-dom";
import sun from "../assets/sun.svg"
import moon from "../assets/moon.svg"
import mosque from "../assets/images/mosque.png"
import { useContext, useEffect, useState } from "react";
import { colors } from "../constants/colors";
import { ThemeContext } from "../context/ThemeContext";
import { Theme, themeType } from "../types/theme";
interface LinkType {
    route: string;
    name: string
}
function Header() {
    const { setTheme, theme } = useContext<Theme>(ThemeContext)
    const [mode, setMode] = useState<themeType>((): themeType => localStorage.getItem("theme") as themeType || theme)
    const [isDark, setIsDark] = useState<boolean>(mode === "Dark")
    const handelUpdateTheme = () => {
        const newMode = isDark ? "Light" : "Dark";
        setIsDark(!isDark);
        setMode(newMode);
        setTheme(newMode);
        localStorage.setItem("theme", newMode);
    }
    const LINKS: LinkType[] = [{ name: "القران الكريم", route: '/quran' }, { name: "مواقيت الصلاة", route: '/prayer-times' }, { name: "الاذكار", route: '/azkar' },]
    useEffect(() => {
        localStorage.setItem("theme", theme)
    }, [mode, isDark, theme])
    return (
        <section style={{ backgroundColor: isDark === true ? `${colors.dark.green}` : colors.light.green, color: isDark === false ? colors.dark.text : colors.light.text }} className={`flex items-center justify-between transition-all duration-500 max-md:px-4 px-[75px] py-2 border-solid border-2 border-transparent border-b-green-300`}>
            <Link to={`/`}>
                <img src={mosque} className="size-[50px]" loading="lazy" alt="" />
            </Link>
            <div className="flex items-center gap-3">
                {LINKS?.map(lnk => (
                    <NavLink to={`${lnk.route}`} className={`[&.active]:${theme === "Dark" ? "border-b-white" : "border-b-black"}  pb-1 border-solid border-b-4 border-transparent`}>{lnk.name}</NavLink>
                ))}
                <span onClick={handelUpdateTheme} className="size-[35px] rounded-lg bg-white flex items-center cursor-pointer hover:bg-[#eee]">
                    {!isDark ? <>
                        <img src={moon} className="size-[50%] mx-auto select-none" loading="lazy" alt="" />
                    </> :
                        < img src={sun} className="size-[50%] mx-auto select-none" loading="lazy" alt="" />
                    }
                </span>
            </div>
        </section>
    )
}

export default Header