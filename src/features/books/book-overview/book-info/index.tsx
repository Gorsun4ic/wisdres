
import { List, ListItem, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { IBookInfo } from "@custom-types/book";

import useShowAuthorsName from "@hooks/useShowAuthorsName";

import Button from "@components/button";

import { StyledBookInfo } from "./style";

const BookInfo = ({ data }: { data: IBookInfo }) => {
	const { title, author, publisher, genre, language, year, pages, rating, img } = data;
	const {getAuthorsNameElem} = useShowAuthorsName();
	const authorsName = getAuthorsNameElem(author);

	return (
		<StyledBookInfo>
			<Stack direction="row" gap={4}>
				<img src={img} alt={title} width="350" height="500" />
				<div>
					<h1 className="book-title">{title}</h1>
					<List>
						<ListItem>Author: {authorsName}</ListItem>
						<ListItem>Publisher: {publisher}</ListItem>
						<ListItem>Genre: {genre}</ListItem>
						<ListItem>Language: {language}</ListItem>
						<ListItem>The year of publishing: {year}</ListItem>
						<ListItem>Pages count: {pages}</ListItem>
						{rating && (
							<ListItem>
								Rating: {rating}
								<StarIcon color="warning" />
							</ListItem>
						)}
					</List>
					<Button size="big">Download</Button>
				</div>
			</Stack>
		</StyledBookInfo>
	);
};

export default BookInfo;