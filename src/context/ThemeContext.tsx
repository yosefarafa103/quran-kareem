import { createContext, ReactNode, useState } from "react"
import { Theme, themeType } from "../types/theme";

export const ThemeContext = createContext<Theme | null>(null)
const ThemeWrapper = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<themeType>((): themeType => localStorage.getItem("theme") as themeType);
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
    )
}

export default ThemeWrapper