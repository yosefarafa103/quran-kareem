import { quran, S } from "@/constants/quran";
import { quranV2 } from "@/constants/quran-v2";
import { Surah } from "@/types/quranSurahs";
import { useCallback, useEffect, useMemo, useState } from "react";
type FiterType = {
  isInSurah: boolean;
  searchedAyah: string;
  surahNumber: number;
};
export interface FilteredAyahs {
  name: string;
  data: Surah[];
}
type QuranV2Surah = typeof quranV2[number]

export function useFilterAyah({
  isInSurah = false,
  searchedAyah,
  surahNumber,
}: FiterType) {
  const [filterdData, setFilterData] = useState<{ data: string[], name?: string }[]>([]);
  const allAyahs = useCallback(() => {
    const o: { [key: number]: QuranV2Surah } = {};
    quranV2.map((e, i, a) => {
      return e.arabic2.map((item) => {
        o[i + 1] = { ...e, name: e.surahNameArabic };
      });
    });
    return o;
  }, [])();
  if (isInSurah) {
    setFilterData(
      quranV2[surahNumber].arabic2.filter((a) =>
        a.includes(searchedAyah)
      )
    );
    return { filterdData };
  }
  const ayahs = useMemo(() => {
    return (
      Object.values(allAyahs)
        .map((item, nx) => {
          return item.ayahs;
        })
        .reduce((item, nx) => {
          return item.concat(nx);
        }, [])
    );
  }, []);
  useEffect(() => {
    let result = Object.values(allAyahs)
      .map((item) => {
        return item.arabic2.filter((a) => {
          return a.match(searchedAyah);
        });
      })
      .map((e, idx) => {
        const data: { data: string[], name?: string } = {
        };
        if (e.length) {
          data["name"] = allAyahs[idx + 1]?.surahNameArabic;
          data["data"] = e;
        }
        return data;
      })
      .filter((o) => Object.keys(o).length);
    setFilterData(result);
    return () => { };
  }, [searchedAyah]);
  return { filterdData };
}
