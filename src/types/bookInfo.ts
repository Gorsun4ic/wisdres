import { IAuthor } from "./author";
import { IPublisher } from "./publisher";
import { IGenre } from "./genre";
import ILanguage from "./language";

export interface IBookInfo {
	img: string;
	rating: number;
	title: string;
	genre: IGenre[];
	author: IAuthor[];
	publisher: IPublisher[];
	language: ILanguage;
	year: number;
	pages: number;
}
