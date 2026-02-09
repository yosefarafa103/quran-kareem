import { create } from "zustand";
import { themeType } from "../types/theme";

interface ThemeStore {
    theme: string;
    setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
    theme: (typeof window !== "undefined" ? localStorage.getItem("theme") : "") ,
    setTheme: (theme: string) => {
        localStorage.setItem("theme", theme);
        set({ theme });
    },
}));
