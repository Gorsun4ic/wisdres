import { IBookInput } from "@src/types/book";

type MultipleEntities = {
	id: string;
	label: string;
};

interface IBookInputAutocomplete extends IBookInput {
	info: {
		genre: MultipleEntities[];
		author: MultipleEntities[];
		publisher: MultipleEntities;
		language: MultipleEntities;
	}
}

export const normalizeSubmission = (data: IBookInputAutocomplete) => {
	return {
		...data,
		info: {
			...data.info,
			genre: data.info.genre?.map((g: MultipleEntities) => g.id),
			author: data.info.author?.map((a: MultipleEntities) => a.id),
			publisher: data.info.publisher?.id,
			language: data.info.language?.id,
		},
	};
};
