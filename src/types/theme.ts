import { Dispatch, SetStateAction } from "react";

export type Theme = { theme: string | null, setTheme: Dispatch<SetStateAction<themeType>> }

export type themeType = string | null
