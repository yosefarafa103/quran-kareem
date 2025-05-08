import { PrayerItems } from "../types/prayers";
const prayers: PrayerItems[] = [
  "Asr",
  "Dhur",
  "Fajr",
  "Isha",
  "Maghrib",
  "Sunrise",
];
export function getNextPrayer(
  prayersTime: string[],
  // prayers: Prayers[],
  hours: number
): PrayerItems {
  const result = prayersTime
    .map((e) => +e.split(":")[0])
    .filter((item) => {
      if (hours > +prayersTime[prayersTime.length - 1].split(":")[0]) return [];
      return item <= hours;
    });
  switch (result.length) {
    case 6:
      return prayers[0];
    case 5:
      return prayers[result.length];
    case 4:
      return prayers[result.length];
    case 3:
      return prayers[result.length];
    case 2:
      return prayers[result.length];
    case 1:
      return prayers[result.length];
    default:
      return prayers[0];
  }
}
