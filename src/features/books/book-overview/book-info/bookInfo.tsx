import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { List, ListItem, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { useLazyGetBookInfoQuery } from "@api/apiBooksSlice";

import Button from "@components/button";

import { StyledBookInfo } from "./style";

const BookInfo = () => {
	const { bookId } = useParams();
	const [getInfoById, { data: bookInfo }] = useLazyGetBookInfoQuery();

	useEffect(() => {
		if (bookId) {
			getInfoById(bookId);
			console.log(bookInfo);
		}
	}, [getInfoById, bookId, bookInfo]);

	return (
		<StyledBookInfo>
			<Stack direction="row" gap={4}>
				<img
					src={bookInfo?.img}
					alt={bookInfo?.title}
					width="350"
					height="500"
				/>
				<div>
					<h1 className="book-title">{bookInfo?.title}</h1>
					<List>
						<ListItem>
							<Link to={`/author/${bookInfo?.author?._id}`}>
								Author: {bookInfo?.author?.title || "Unknown author"}
							</Link>
						</ListItem>
						<ListItem>
							Publisher: {bookInfo?.publisher?.title || "Unknown publisher"}
						</ListItem>
						<ListItem>
							Genre: {bookInfo?.genre?.title || "Unknown genre"}
						</ListItem>
						<ListItem>Language: {bookInfo?.language?.title}</ListItem>
						<ListItem>The year of publishing: {bookInfo?.year}</ListItem>
						<ListItem>Pages count: {bookInfo?.pages}</ListItem>
						{bookInfo?.rating && (
							<ListItem>
								Rating: {bookInfo?.rating}
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
