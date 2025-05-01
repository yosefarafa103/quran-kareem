import { Context, createContext, Dispatch, memo, ReactNode, SetStateAction, useState } from 'react'
interface searchContextType<T = string> {
    setValue: Dispatch<SetStateAction<T>>,
    value: T
}
export const SearchInSurahsContext: Context<searchContextType> = createContext<searchContextType>()

const SearchInSurahContext = ({ children }: { children: ReactNode }) => {
    const [value, setValue] = useState("");
    return (
        <SearchInSurahsContext.Provider value={{ setValue, value }}>
            {children}
        </SearchInSurahsContext.Provider>
    )
}

export default SearchInSurahContext