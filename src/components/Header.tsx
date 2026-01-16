import { Link, NavLink, useNavigate } from "react-router-dom";

import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
import mosque from "../assets/images/mosque.png";
import { useCallback, useContext, useEffect, useState } from "react";
import { colors } from "../constants/colors";
import { ThemeContext } from "@/context/ThemeContext";
import { Theme, themeType } from "../types/theme";
import { Menu, Wifi, WifiOff } from "lucide-react";
import { LINKS } from "../constants/variables";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

import InstallButton from "./InstallWebsite";
import { useIsOnline } from "@/hooks/useIsOnline";
function Header() {
  const { isOnline } = useIsOnline();
  const { setTheme, theme } = useContext(ThemeContext) as Theme;
  const [mode, setMode] = useState<themeType>(
    (): themeType => (localStorage.getItem("theme") as themeType) || theme
  );
  const [isDark, setIsDark] = useState<boolean>(mode === "Dark");
  const handelUpdateTheme = useCallback(() => {
    const newMode = isDark ? "Light" : "Dark";
    setIsDark(!isDark);
    setMode(newMode);
    setTheme(newMode);
    localStorage.setItem("theme", newMode);
  }, [isDark]);
  const n = useNavigate();
  useEffect(() => localStorage.setItem("theme", theme), [mode, isDark, theme]);
  return (
    <>
      <Dialog>
        <DropdownMenu dir="rtl">
          <section
            style={{
              backgroundColor:
                isDark === true ? `${colors.dark.green}` : colors.light.green,
              color: isDark === false ? colors.dark.text : colors.light.text,
            }}
            className={`flex items-center justify-between transition-all duration-500 max-md:px-4 px-[75px] py-2 border-solid border-2 border-transparent border-b-green-300 sticky top-0 `}
          >
            <Link to={`/`}>
              <img src={mosque} className="size-[50px]" loading="lazy" alt="" />
            </Link>
            <div className="flex items-center gap-3 ">
              {LINKS?.map((lnk) => (
                <NavLink
                  key={lnk.route}
                  to={`${lnk.route}`}
                  className={`[&.active]:${
                    theme === "Dark" ? "border-b-white" : "border-b-black"
                  } max-sm:hidden pb-1 border-solid border-b-4 border-transparent`}
                >
                  {lnk.name}
                </NavLink>
              ))}
              <span
                onClick={handelUpdateTheme}
                className="size-[35px] max-sm:hidden rounded-lg bg-white flex items-center cursor-pointer hover:bg-[#eee]"
              >
                {!isDark ? (
                  <>
                    <img
                      src={moon}
                      className="size-[50%] mx-auto select-none"
                      loading="lazy"
                      alt=""
                    />
                  </>
                ) : (
                  <img
                    src={sun}
                    className="size-[50%] mx-auto select-none"
                    loading="lazy"
                    alt=""
                  />
                )}
              </span>
            </div>
            <div className="sm:hidden flex cursor-pointer items-center gap-3">
              {isOnline ? (
                <Wifi className="text-green-400" />
              ) : (
                <WifiOff className="text-red-400" />
              )}
              <InstallButton />
              <span
                onClick={handelUpdateTheme}
                className="size-[35px] rounded-lg bg-white !text-white flex items-center cursor-pointer "
              >
                <img
                  src={isDark ? sun : moon}
                  className="size-[50%] mx-auto select-none"
                  loading="lazy"
                  alt=""
                />
              </span>
              <DropdownMenuTrigger>
                <Menu />
              </DropdownMenuTrigger>
            </div>
          </section>
          <DropdownMenuContent
            side="bottom"
            sideOffset={20}
            align="end"
            className="w-full max-w-[600px] relative z-[999] bg-green-300"
          >
            {LINKS?.map((lnk) => (
              <DropdownMenuItem
                className="bg-background mt-1"
                key={lnk.route}
                onClick={() => n(lnk.route)}
              >
                {lnk.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </Dialog>
    </>
  );
}

export default Header;
