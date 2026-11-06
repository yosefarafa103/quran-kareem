import { useThemeStore } from "@/stores/themeStore";
import { Theme } from "@/types/theme";
import { useContext, useState } from "react";
import { useFontStore } from "./SurahText";

interface Props {
  children: React.ReactNode;
}
const WrapperContent = ({ children }: Props) => {
  const { theme } = useThemeStore();
  return (
    <main
      className={`
        ${theme?.toLowerCase()}
       transition-all duration-500`}
    >
      {children}
    </main>
  );
};

export default WrapperContent;
