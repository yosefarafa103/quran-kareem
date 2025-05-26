import { LINKS } from "../constants/variables"
import { NavLink } from "react-router-dom";

const HeaderMobileScreens = () => {
    console.log(LINKS);

    return (
        <div className="flex items-center gap-3 flex-col p-4 bg-white border-solid border-2 w-[99%] mx-auto border-black sm:hidden">
            {LINKS?.map(lnk => (
                <NavLink to={`${lnk.route}`} className={`border-b-[#ddd] w-full pb-4 pr-5 border-solid border-b-[1px]`}>{lnk.name}</NavLink>
            ))}

        </div>
    )
}

export default HeaderMobileScreens