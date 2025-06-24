import { LangType } from "@src/i18n";

// Check if title has multiple languages. Most of title have those, but e.g publisher - doesn't
export const getTitle = (title: string | LangType, lang: string): string =>
	typeof title === "object" && title !== null ? title[lang] || "" : title;
