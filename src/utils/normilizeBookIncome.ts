import { IBook } from "@src/types/book";
import { IAuthor } from "@src/types/author";
import { IGenre } from "@src/types/genre";

import { getLangEntity } from "./getLangEntity";
import { LangType } from "@src/i18n";
import { FieldValues } from "react-hook-form";

type MultipleEntities = {
	id: string;
	label: string;
};
export interface IBookInputAutocomplete {
	info: {
		genre: MultipleEntities[];
		author: MultipleEntities[];
		publisher: MultipleEntities;
		language: MultipleEntities;
	};
}

export const normalizeSubmission = <T extends FieldValues>(
	data: T
): T => {
	return {
		...data,
		info: {
			...data.info,
			genre: data.info.genre?.map((g: IGenre) => g.id),
			author: data.info.author?.map((a: IAuthor) => a.id),
			publisher: data.info.publisher?.id,
			language: data.info.language?.id,
		},
	} as T;
};


export const formatAutocompleteBookData = (data: IBook, lang: LangType) => {
	const bookInfo = data?.info;
	const author = bookInfo.author?.map((author: IAuthor) => {
		return {
			label: getLangEntity(author?.title, lang),
			id: author?._id,
		};
	});
	const publisher = {
		label: bookInfo.publisher?.title,
		id: bookInfo.publisher?._id,
	};
	const genre = bookInfo.genre?.map((genre: IGenre) => {
		return {
			label: getLangEntity(genre?.title, lang),
			id: genre?._id,
		};
	});
	const language = {
		label: getLangEntity(bookInfo.language?.title, lang),
		id: bookInfo.language?._id,
	};

	return {
		...data,
		info: {
			...bookInfo,
			author,
			publisher,
			language,
			genre,
		},
	};
};

export const formatFromAutocompleteBookData = (data: IBookInputAutocomplete) => {
	const bookInfo = data?.info;
	const author = bookInfo.author?.map(
		(author: { label: string; id: string }) => {
			return author?.id;
		}
	);
	const genre = bookInfo.genre?.map((genre: { label: string; id: string }) => {
		return genre?.id;
	});
	const publisher = bookInfo.publisher?.id;
	const language = bookInfo.language?.id;
	return {
		...data,
		info: {
			...bookInfo,
			author,
			publisher,
			language,
			genre,
		},
	};
};
