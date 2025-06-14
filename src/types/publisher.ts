import {
	ApiSuccess,
	ApiError,
} from "./apiResponse";
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

// Get Publishers
export type GetPublishersResponse = ApiSuccess<IPublisher[]> | ApiError;

// Get Publisher
export type GetPublisherResponse = ApiSuccess<IPublisher> | ApiError;

// Add Publisher
export type AddPublisherResponse = ApiSuccess<IPublisher> | ApiError;

// Add Publishers
export type AddPublishersResponse = ApiSuccess<IPublisher[]> | ApiError;

// Delete Publisher
export type DeletePublisherResponse = ApiSuccess<IPublisher> | ApiError;

// Update Publisher
export type UpdatePublisherResponse = ApiSuccess<IPublisher> | ApiError;