import { create } from "zustand";
import { themeType } from "../types/theme";

interface ThemeStore {
    theme: themeType | null;
    setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: (typeof window !== "undefined" ? localStorage.getItem("theme") : null) as themeType | null,
    setTheme: (theme: string) => {
        localStorage.setItem("theme", theme);
        set({ theme });
    },
}));
