import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { useContext, } from 'react'
import type { PrayersTimeResponse } from "../types/prayers"
import { arabicPrayers, } from '../utils/getRemainingToPray'
import Loader from './Loader'
import { Theme } from '../types/theme'
import { ThemeContext } from '../context/ThemeContext'
import { colors } from '../constants/colors'

const MwaketElsalaa = () => {
    const { theme } = useContext<Theme>(ThemeContext)

    const getPrayerTimes = async () => {
        try {
            const data: AxiosResponse<PrayersTimeResponse> = await axios.get(`https://alquran.vip/APIs/getPrayerTimes`);
            return data?.data
        } catch (err) {
            throw new Error(err as any)
        }
    }
    const { data, isLoading } = useQuery({
        queryFn: getPrayerTimes,
        queryKey: ["mwaket_elsalaa"]
    });
    return (
        <>
            {isLoading ? <Loader /> :
                <div style={{ backgroundColor: theme === "Dark" ? `${colors.dark.green}` : colors.light.green, color: theme !== "Dark" ? colors.dark.text : colors.light.text }} className={`p-[20px]`}>
                    <section className='flex items-center justify-between '>
                        <div>{data?.date?.date_hijri?.weekday?.ar} {data?.date?.date_hijri?.month?.number} {data?.date?.date_hijri?.month?.ar}</div>
                        <div></div>
                    </section>
                    <div className='flex items-center gap-4 justify-between mt-10 border-solid border-2 border-green-300'>
                        {data && arabicPrayers.map(time => (
                            <div className='sm:p-4 flex-1 text-center border-solid border-2 border-transparent border-l-green-300 font-bold  p-1 sm:text-lg text-sm'>{time}</div>
                        ))}
                    </div>
                    <div style={{ borderColor: `${theme === "Dark" ? "#fff" : "#000"}` }}  className='flex items-center gap-4 justify-between border-solid border-2  mt-2'>
                        {data && Object.values(data?.prayer_times)?.map((time, idx) => (
                            <div style={{ borderLeftColor: `${theme === "Dark" ? "#fff" : "#000"}` }} className='sm:p-4 whitespace-nowrap flex-1 text-center border-solid border-2 border-transparent  font-bold  p-1 sm:text-lg text-sm'>{time} {(idx === 0 || idx === 1) ? "ص" : "م"} </div>
                        ))}
                    </div>
                </div>
            }

        </>
    )
}

export default MwaketElsalaa