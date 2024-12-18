import { IBookInfo } from "./bookInfo";
import { IBookDetails } from "./bookDetails";
import { IReview } from "./review";

export interface IBook {
	_id?: string;
	id?: string;
	info: IBookInfo;
	details: IBookDetails;
	reviews: IReview[];
}