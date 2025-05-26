import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState } from "react";
export const ThemeContext = createContext(null);
const ThemeWrapper = ({ children }) => {
    const [theme, setTheme] = useState(() => localStorage.getItem("theme"));
    return (_jsx(ThemeContext.Provider, { value: { theme, setTheme }, children: children }));
};
export default ThemeWrapper;
