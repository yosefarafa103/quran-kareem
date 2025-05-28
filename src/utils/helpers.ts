export function removeTashkil(val: string): string {
  return val.replace(/[\u064B-\u0652-\u065F\u06D6-\u06ED\u0610-\u061A]/g, "");
}
// \u0610-\u061A\u064B-\u065F\u06D6-\u06ED
export const replaceNumsEnglishToArabic = (ayahNum: string) => {
  const numbers = [
    { arabic: "٠", english: "0" },
    { arabic: "١", english: "1" },
    { arabic: "٢", english: "2" },
    { arabic: "٣", english: "3" },
    { arabic: "٤", english: "4" },
    { arabic: "٥", english: "5" },
    { arabic: "٦", english: "6" },
    { arabic: "٧", english: "7" },
    { arabic: "٨", english: "8" },
    { arabic: "٩", english: "9" },
  ];
  return numbers.map((_) =>
    ayahNum
      ?.split("")
      .map((ltr) => {
        const arabicItem = numbers.find((val) => val.english.includes(ltr));
        return ltr.replace(ltr, arabicItem!?.arabic);
      })
      .join("")
  )[0];
};
