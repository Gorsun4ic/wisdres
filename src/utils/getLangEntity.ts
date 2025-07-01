import { LangType } from "@src/i18n";

// Check if entity has multiple languages. Most of entity have those, but e.g publisher - doesn't
export const getLangEntity = (
	entity: string | Record<LangType, string>,
	lang: LangType
): string =>
	typeof entity === "object" && entity !== null ? entity[lang] || "" : entity;
