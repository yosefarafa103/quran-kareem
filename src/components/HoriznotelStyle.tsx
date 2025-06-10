import { getData } from "@/utils/getData";
import { getPerPage } from "@/utils/getQuranPerPage"
import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { useEffect, useState } from "react";

const HoriznotelStyle = ({ num }: { num: number }) => {
    let len = getPerPage(num).length - 1;
    const [ayahs, setAyahs] = useState([]);

    const { data } = useQuery({
        queryKey: [""],
        queryFn: async () => {
            await Promise.all(new Array(getPerPage(num)[len]?.page).fill('').map(async (e, i, a) => {
                try {
                    let p = await (axios.get(`https://alquran.vip/APIs/quranPagesText?page=${i + 1}`))
                    setAyahs(() => setAyahs([...ayahs, p.data]))
                    return p
                } catch (error) {
                    console.log(error);
                }
            }))
        }
    })


    console.log(ayahs, data);
    // console.log(getPerPage(num)[0].page, getPerPage(num)[len]?.page);

    return (
        <div>HoriznotelStyle</div>
    )
}

export default HoriznotelStyle