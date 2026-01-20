import {
  SetStateAction,
  Dispatch,
  useState,
  useContext,
  useEffect,
} from "react";
import { Theme } from "../types/theme";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../constants/colors";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { themes } from "@/constants/variables";

const SearchBox = ({
  setFilter,
}: {
  setFilter: Dispatch<SetStateAction<string>>;
}) => {
  const [value, setValue] = useState("");
  const { theme } = useContext<Theme>(ThemeContext);
  useEffect(() => {
    setFilter(value);
  }, [value]);
  return (
    <section
      style={{
        backgroundColor: themes[+theme!?.split("-")?.[1] - 1]?.border,
        color: theme === "Light" ? colors.dark.text : colors.light.text,
      }}
      className={`flex items-center gap-3 sm:m-4 m-2 sticky transition-all duration-500 top-18 rounded-xl p-3`}
    >
      <Input
        style={{
          borderColor: "#fff",
        }}
        onChange={(e) => setValue(e.target.value)}
        className="p-2 border-solid border-[1px] border-black outline-0 grow rounded-md"
        type="text"
        placeholder="سوره ال..."
      />
    </section>
  );
};

export default SearchBox;
