import { IBookInfo } from "@custom-types/book";
import { StyledBook } from "./style";
import BookInfo from "@features/books/book-overview/book-info";

const BookOverview = ({data}: {data: IBookInfo}) => {

	return (
		<StyledBook>
			<BookInfo data={data} />
		</StyledBook>
	);
};

export default BookOverview;
