import { IBookInfo } from "./bookInfo";
import { IBookDetails } from "./bookDetails";
export interface IBook {
	_id: string;
	info: IBookInfo;
	details: IBookDetails;
	reviews: string[];
};

export type IBookInput = Omit<IBook, "_id"> & {
	info: Omit<IBookInfo, "arrived">;
};

export type IBookPatch = {
	info?: Partial<Omit<IBookInfo, "arrived">>;
	details?: Partial<IBookDetails>;
}
