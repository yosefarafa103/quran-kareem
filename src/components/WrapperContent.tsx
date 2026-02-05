import { useThemeStore } from "@/stores/themeStore";
import { Theme } from "@/types/theme";
import { useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}
const WrapperContent = ({ children }: Props) => {
  const { theme } = useThemeStore();

  const [fontSize] = useState(() => localStorage.getItem("font_size"));
  return (
    <main
      style={{
        fontSize: localStorage.getItem("font_size")
          ? `${Number(fontSize)}px`
          : "16px",
      }}
      className={`${theme?.toLowerCase()} transition-all duration-500`}
    >
      {children}
    </main>
  );
};

export default WrapperContent;
