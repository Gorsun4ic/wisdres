import { IBookInfo } from "@custom-types/book";
import { StyledBook } from "./style";
import BookInfo from "@features/books/book-overview/book-info";
import Thumbs from "@features/books/book-overview/thumbs";
const BookOverview = () => {
	const images: string[] = [
		"https://swiperjs.com/demos/images/nature-1.jpg",
		"https://swiperjs.com/demos/images/nature-2.jpg",
		"https://swiperjs.com/demos/images/nature-3.jpg",
		"https://swiperjs.com/demos/images/nature-4.jpg",
		"https://swiperjs.com/demos/images/nature-5.jpg",
		"https://swiperjs.com/demos/images/nature-6.jpg",
		"https://swiperjs.com/demos/images/nature-7.jpg",
		"https://swiperjs.com/demos/images/nature-8.jpg",
		"https://swiperjs.com/demos/images/nature-9.jpg",
		"https://swiperjs.com/demos/images/nature-10.jpg",
	];

	const data: IBookInfo = {
		img: "string",
		rating: 10,
		title: "The Atomic Habits",
		genre: ["Self-improvement"],
		author: "James Clear",
		publisher: "Nash format",
		language: "English",
		year: 2024,
		pages: 508,
	};

	return (
		<StyledBook>
			<Thumbs images={images} bookName="Book name" />
			<BookInfo data={data} />
		</StyledBook>
	);
};

export default BookOverview;
