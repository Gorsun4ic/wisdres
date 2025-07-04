export interface IGenre {
	_id: string;
	id: string;
	img: {
		en: string;
		ua: string;
	};
	title: {
		en: string;
		ua: string;
	};
}

export type IGenreInput = Omit<IGenre, "_id">;

export type IGenrePatch = {
	img?: Partial<IGenre["img"]>;
	title?: Partial<IGenre["title"]>;
};
