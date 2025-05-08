import { Context, createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'
interface searchContextType<T = string> {
    setValue: Dispatch<SetStateAction<T>>,
    value: T
}
export const SearchInSurahsContext: Context<searchContextType> = createContext<searchContextType | null>(null)

const SearchInSurahContext = ({ children }: { children: ReactNode }) => {
    const [value, setValue] = useState("");
    return (
        <SearchInSurahsContext.Provider value={{ setValue, value }}>
            {children}
        </SearchInSurahsContext.Provider>
    )
}

export default SearchInSurahContext