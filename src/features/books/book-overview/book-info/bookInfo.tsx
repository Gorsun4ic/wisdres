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
		}
	}, [getInfoById, bookId]);

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
							Author{bookInfo?.author?.length > 1 ? "s" : ""}:{" "}
							{Array.isArray(bookInfo?.author) ? (
								<Stack direction="row" gap={1}>
									{bookInfo.author.map((author, index) => (
										<span key={author._id}>
											<Link to={`/author/${author._id}`}>{author.title}</Link>
											{index < bookInfo.author.length - 1 ? ", " : " "}
										</span>
									))}
								</Stack>
							) : (
								"Unknown author"
							)}
						</ListItem>
						{bookInfo?.publisher && (
							<ListItem>
								Publisher:
								<Link to={`/publisher/${bookInfo?.publisher?._id}`}>
									{bookInfo?.publisher?.title}
								</Link>
							</ListItem>
						)}
						<ListItem>
							Genres:{" "}
							{Array.isArray(bookInfo?.genre)
								? bookInfo.genre.map((genre, index) => (
										<span key={genre._id}>
											{genre.title}
											{index < bookInfo.genre.length - 1 ? ", " : ""}
										</span>
								  ))
								: "Unknown genre"}
						</ListItem>
						<ListItem>
							Language: {bookInfo?.language?.title || "Unknown language"}
						</ListItem>
						<ListItem>The year of publishing: {bookInfo?.year}</ListItem>
						<ListItem>Pages count: {bookInfo?.pages}</ListItem>
						{bookInfo?.rating && (
							<ListItem>
								Rating: {bookInfo?.rating}
								<StarIcon color="warning" />
							</ListItem>
						)}
					</List>
					<Link to={bookInfo?.link}>
						<Button size="big">Download</Button>
					</Link>
				</div>
			</Stack>
		</StyledBookInfo>
	);
};

export default BookInfo;
