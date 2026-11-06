import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import arabicTranslation from "../data/lang/ar.json";
const resources = {
  en: {},
  ar: {
    translation: arabicTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ar",
});

export default i18n;
