import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState } from 'react';
export const SearchInSurahsContext = createContext(null);
const SearchInSurahContext = ({ children }) => {
    const [value, setValue] = useState("");
    return (_jsx(SearchInSurahsContext.Provider, { value: { setValue, value }, children: children }));
};
export default SearchInSurahContext;
