export interface Surah {
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  ayat_count?: number;
  name_ar?: string;
  name_en?: string;
  name?: string;
  name_en_translation?: string;
  type?: "Medinan" | "Meccan";
  id?: number;
  text: string;
  number: number;
  englishNameTranslation?: string;
  revelationType?: string;
  englishName?: string;
}
export type SurahAyahs = Surah[];
export interface SurahsAyahs<T = string> {
  id: T;
  number: number;
  arabicName?: T;
  text: T;
  number_in_surah: T;
  juz: T;
  page: T;
  surah_id: T;
  hizb_id: T;
  juz_id: T;
  sajda: T;
}
