export interface IReview {
	_id: string;
	user: string;
	book: string;
	rating: number;
	text: string;
	date: Date;
}

export type IReviewInput = Omit<IReview, "_id" | "date">;