export interface IPublisher {
	_id: string;
	img: string;
	title: string;
	about: {
		en: string;
		ua: string;
	};
	bookIds: string[];
};

export type IPublisherInput = Omit<IPublisher, "_id" | "bookIds">;

export type IPublisherPatch = {
	img?: string;
	title?: Partial<IPublisher["title"]>;
	about?: Partial<IPublisher["about"]>;
};
