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
	genre: string[];
	author: string[];
	publisher: string;
	language: string;
	year: number;
	pages: number;
	rating: number;
	arrived: Date;
}
