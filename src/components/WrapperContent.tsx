import { ThemeContext } from "@/context/ThemeContext";
import { Theme } from "@/types/theme";
import { useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}
const WrapperContent = ({ children }: Props) => {
  const theme = useContext(ThemeContext) as Theme;
  const [fontSize] = useState(() => localStorage.getItem("font_size"));
  return (
    <main
      style={{
        fontSize: localStorage.getItem("font_size")
          ? `${Number(fontSize)}px`
          : "16px",
      }}
      className={`${theme?.theme?.toLowerCase()} transition-all duration-500`}
    >
      {children}
    </main>
  );
};

export default WrapperContent;
