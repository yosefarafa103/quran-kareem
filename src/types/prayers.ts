export interface PrayersTimeResponse {
  date: {
    date_hijri: {
      month: {
        ar: string;
        days: number;
        en: string;
        number: number;
      };
      weekday: { en: string; ar: string };
    };
  };
  prayer_times: Prayers;
}
export type PrayerItems = "Asr" | "Dhur" | "Fajr" | "Isha" | "Maghrib" | "Sunrise";
export type Prayers = Record<PrayerItems, string>;
