export interface Surah {
  ayat_count: number;
  name_ar: string;
  name_en: string;
  name_en_translation: string;
  type: "Medinan" | "Meccan";
  id: number;
}
export interface SurahsAyahs<T = string> {
  id: T;
  number: T;
  text: T;
  number_in_surah: T;
  page: T;
  surah_id: T;
  hizb_id: T;
  juz_id: T;
  sajda: T;
}
