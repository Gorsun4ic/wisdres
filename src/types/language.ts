export interface ILanguage {
	_id: string;
	title: {
		en: string;
		ua: string;
	};
}

export type ILanguageInput = Omit<ILanguage, "_id">;

export type ILanguagePatch = Partial<ILanguage["title"]>;
