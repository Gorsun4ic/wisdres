import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend"; // <-- You missed this line
import translationEN from "./locales/en/translation.json";
import translationUA from "./locales/ua/translation.json";


i18n
	.use(Backend) // loads translations from /locales/{{lng}}/translation.json
	.use(LanguageDetector) // detects browser language
	.use(initReactI18next) // passes i18n instance to react-i18next
	.init({
		resources: {
			en: { translation: translationEN },
			ua: { translation: translationUA },
		},
		lng: "ua",
		fallbackLng: "en",
		debug: true,
		interpolation: {
			escapeValue: false, // not needed for React
		},
		backend: {
			loadPath: "/locales/{{lng}}/translation.json",
		},
	});

export default i18n;
