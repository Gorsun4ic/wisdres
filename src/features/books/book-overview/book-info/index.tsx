import { List, ListItem } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { IBookInfo } from "@custom-types/book";
import { StyledBookInfo } from "./style";
import Button from "@components/button";
const BookInfo = ({ data }: { data: IBookInfo }) => {
	const { title, author, publisher, genre, language, year, pages, rating } = data;
	return (
		<StyledBookInfo>
			<h1 className="book-title">{title}</h1>
			<List>
				<ListItem>Author: {author}</ListItem>
				<ListItem>Publisher: {publisher}</ListItem>
				<ListItem>Genre: {genre}</ListItem>
				<ListItem>Language: {language}</ListItem>
				<ListItem>The year of publishing: {year}</ListItem>
				<ListItem>Pages count: {pages}</ListItem>
				<ListItem>
					Rating: {rating}
					<StarIcon color="warning" />
				</ListItem>
			</List>
			<Button size="big">Download</Button>
		</StyledBookInfo>
	);
};

export default BookInfo;