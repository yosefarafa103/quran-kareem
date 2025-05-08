import { Dispatch, SetStateAction } from "react";

export type Theme = { theme: "Dark" | "Light", setTheme: Dispatch<SetStateAction<themeType>> }

export type themeType = "Dark" | "Light"
