import { IAuthor } from "./author";
import { ILanguage } from "./language";
import { IPublisher } from "./publisher";
import { IGenre } from "./genre";

export interface IBookInfo {
	img: {
		en: string;
		ua: string;
	};
	title: {
		en: string;
		ua: string;
	};
	link: {
		en: string;
		ua: string;
	};
	genre: IGenre[];
	author: IAuthor[];
	publisher: IPublisher;
	language: ILanguage;
	year: number;
	pages: number;
	rating: number;
	arrived: Date;
}
