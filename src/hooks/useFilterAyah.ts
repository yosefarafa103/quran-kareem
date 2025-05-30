import { quran, S } from "@/constants/quran";
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
export function useFilterAyah({
  isInSurah = false,
  searchedAyah,
  surahNumber,
}: FiterType) {
  const [filterdData, setFilterData] = useState<FilteredAyahs[]>();
  const allAyahs = useCallback(() => {
    const o = {};
    quran.map((e, i, a) => {
      return e.ayahs.map((item) => {
        o[i + 1] = { ...e, name: e.name };
        // return { ...item, name: e.name };
      });
    });
    return o;
  }, [])();
  if (isInSurah) {
    setFilterData(
      quran[surahNumber].ayahs.filter((a) =>
        a.text.replace(/[\u064B-\u0652]/g, "").includes(searchedAyah)
      )
    );
    return { filterdData };
  }
  const ayahs = useMemo(() => {
    return (
      Object.values(allAyahs)
        // @ts-ignore
        .map((item: S, nx) => {
          return item.ayahs;
        })
        // @ts-ignore
        .reduce((item: S[], nx: S[]) => {
          return item.concat(nx);
        }, [])
    );
  }, []);
  useEffect(() => {
    let result: FilteredAyahs[] = Object.values(allAyahs)
      .map((item) => {
        return item.ayahs.filter((a) => {
          return a.text.replace(/[\u064B-\u0652]/g, "").match(searchedAyah);
        });
      })
      .map((e, idx) => {
        const data = {};
        if (e.length) {
          // @ts-ignore
          data["name"] = allAyahs[idx + 1]?.name;
          // @ts-ignore
          data["data"] = e;
        }
        return data;
      })
      .filter((o) => Object.keys(o).length);
    setFilterData(result);
    return () => {};
  }, [searchedAyah]);
  return { filterdData };
}
