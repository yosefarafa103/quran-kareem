import { Link, NavLink, useNavigate } from "react-router-dom";
import mosque from "../assets/images/mosque.png";
import { useCallback, useContext, useEffect, useState } from "react";
import { colors } from "../constants/colors";
import { Theme, themeType } from "../types/theme";
import { Menu, Moon, Palette, Sun, Wifi, WifiOff } from "lucide-react";
import { LINKS, themes } from "../constants/variables";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Dialog } from "./ui/dialog";

import InstallButton from "./InstallWebsite";
import { useIsOnline } from "@/hooks/useIsOnline";
import axios from "axios";
import { useThemeStore } from "@/stores/themeStore";
function Header() {
  const { isOnline } = useIsOnline();
  const { setTheme, theme } = useThemeStore();
  const [mode, setMode] = useState<string>(theme || "dark");
  const [isDark, setIsDark] = useState<boolean>(mode === "Dark");
  const handelUpdateTheme = useCallback(() => {
    const newMode = isDark ? "Light" : "Dark";
    setIsDark(!isDark);
    setMode(newMode);
    setTheme(newMode);
    localStorage.setItem("theme", newMode);
  }, [isDark]);
  const n = useNavigate();
  useEffect(
    () => localStorage.setItem("theme", theme || "dark"),
    [mode, isDark, theme],
  );
  useEffect(() => {
    console.log(1);
    (async function () {
      const data = await axios.get(`https://users.roblox.com/v1/users/1`);
      console.log(data.data);
    })();
  }, []);

  return (
    <>
      <Dialog>
        <DropdownMenu dir="rtl">
          <section
            style={{
              backgroundColor: /theme-\d/gi.test(theme!)
                ? themes[+parseInt(theme!.split("-")?.[1]) - 1]?.border
                : isDark === true
                  ? `${colors.dark.green}`
                  : colors.light.green,
              color: /theme-\d/gi.test(theme!)
                ? "#fff"
                : isDark === false
                  ? colors.dark.text
                  : colors.light.text,
            }}
            className={`flex items-center justify-between transition-all duration-500 max-md:px-4 px-[75px] py-2 border-solid border-2 border-transparent border-b-green-300 sticky top-0`}
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
                className="size-[35px] max-sm:hidden rounded-lg flex items-center cursor-pointer"
              >
                {!isDark ? (
                  <>
                    <Moon />
                  </>
                ) : (
                  <Sun />
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
                className="rounded-lg flex items-center cursor-pointer "
              >
                {!isDark ? (
                  <>
                    <Moon />
                  </>
                ) : (
                  <Sun />
                )}
              </span>
              <ThemesDropDown />
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
function ThemesDropDown() {
  const { setTheme } = useThemeStore();

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger>
        <Palette />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="mt-5">
        {themes.map((el, idx) => (
          <DropdownMenuItem onClick={() => setTheme(`theme-${idx}`)}>
            ثيم {++idx}
            <div className="flex gap-1 items-center">
              <span
                className="size-5 flex rounded-full"
                style={{
                  backgroundColor: el.primaryColor,
                }}
              />
              <span
                className="size-5 flex rounded-full"
                style={{
                  backgroundColor: el.secondaryColor,
                }}
              />
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
