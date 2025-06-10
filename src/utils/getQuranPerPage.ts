import { quran } from "@/constants/quran";

export function getPerPage(surahId: number) {
  return quran[surahId].ayahs
    .filter((e, i, a) => a[i + 1]?.page > a[i].page)
    // .filter((e) => !Number.isInteger(e));
}
