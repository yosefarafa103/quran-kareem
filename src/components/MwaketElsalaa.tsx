import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import type { PrayersTimeResponse } from "../types/prayers"
import { getNextPrayer } from '../utils/getNextPrayer'
import { arabicPrayers, getRemainingToPray } from '../utils/getRemainingToPray'

const MwaketElsalaa = () => {
    const getPrayerTimes = async () => {
        try {
            const data: AxiosResponse<PrayersTimeResponse> = await axios.get(`https://alquran.vip/APIs/getPrayerTimes`);
            return data?.data
        } catch (err) {
            throw new Error(err as any)
        }
    }
    const [nextPray, setnextPray] = useState<string>("")
    const { data, isLoading } = useQuery({
        queryFn: getPrayerTimes,
        queryKey: ["mwaket_elsalaa"]
    });
    useEffect(() => {
        if (data) {
            const prayersTime = Object.values(data?.prayer_times)
            const prayers: string[] = Object.keys(data?.prayer_times)
            const currentHour = new Date().getHours()
            // setnextPray(getNextPrayer(prayersTime, prayers, currentHour))
            const [_, currentPrayTime] = [prayersTime[prayers.indexOf(`${getNextPrayer(prayersTime, new Date().getHours())}`) - 1], prayersTime[prayers.indexOf(`${getNextPrayer(prayersTime, new Date().getHours())}`)]]
            const { hours, minutes } = getRemainingToPray(currentHour.toString(), currentPrayTime);
            arabicPrayers
            setnextPray(`متبقي ${hours >= 1 ? `${hours} ساعة` : ""} و ${minutes} دقيقة علي اذان ${arabicPrayers[prayers.indexOf(`${getNextPrayer(prayersTime, new Date().getHours())}`)]}`)
        }
    }, [data]);

    return (
        <div className='bg-green-50 p-[20px]'>
            <section className='flex items-center justify-between '>
                <div>{data?.date.date_hijri?.weekday?.ar} {data?.date.date_hijri?.month?.days} {data?.date.date_hijri?.month?.ar}</div>
                <div></div>
            </section>
            {isLoading ? "انتظر جاري التحميل ..." : ""}
            <div className='flex items-center gap-4 justify-between mt-10 border-solid border-2 border-green-300'>
                {data && Object.keys(data?.prayer_times)?.map(time => (
                    <div className='sm:p-4 flex-1 text-center border-solid border-2 border-transparent border-l-green-300 font-bold  p-1 sm:text-lg text-sm'>{time}</div>
                ))}
            </div>
            <div className='flex items-center gap-4 justify-between border-solid border-2 border-black mt-2'>
                {data && Object.values(data?.prayer_times)?.map((time, idx) => (
                    <div className='sm:p-4 flex-1 text-center border-solid border-2 border-transparent border-l-black font-bold  p-1 sm:text-lg text-sm'>{time} {(idx === 0 || idx === 1) ? "ص" : "م"} </div>
                ))}
            </div>
            {nextPray}
        </div>
    )
}

export default MwaketElsalaa