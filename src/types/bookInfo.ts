export interface IBookInfo {
	img: string;
	rating: number;
	title: string;
	genre: string[];
	author: {
		_id: string;
		title: string;
	};
	publisher: {
		_id: string;
		title: string;
	};
	language: {
		_id: string;
		title: string;
	};
	year: number;
	pages: number;
}
