import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { List, ListItem, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { useLazyGetBookInfoQuery } from "@api/apiBooksSlice";

import useShowEntityNames from "@hooks/useShowEntityNames ";

import Button from "@components/button";

import { StyledBookInfo } from "./style";

const BookInfo = () => {
	const { activeBookPage } = useSelector((state: RootState) => state);
	const bookId = activeBookPage?.activeBook?._id;
	const [getInfoById, { data: info }] = useLazyGetBookInfoQuery();
	const { getAuthorName, getPublisherName, getGenresName, getLanguageName } =
		useShowEntityNames();
	const [bookInfo, setBookInfo] = useState({
		author: "",
		publisher: "",
		genre: "",
		language: ""
	});

	useEffect(() => {
		if (info) {
			const publisher = getPublisherName(info?.publisher);
			const author = getAuthorName(info?.author);
			const genre = getGenresName(info?.genre);
			const language = getLanguageName(info?.language);

			setBookInfo({
				author,
				publisher,
				genre,
				language
			});
		}
	}, [info]);

	useEffect(() => {
		if (bookId) {
			getInfoById(bookId);
		}
	}, [getInfoById, bookId, info]);

	return (
		<StyledBookInfo>
			<Stack direction="row" gap={4}>
				<img src={info?.img} alt={info?.title} width="350" height="500" />
				<div>
					<h1 className="book-title">{info?.title}</h1>
					<List>
						<ListItem>
							<Link to={`/author/${info?.author}`}>
								Author: {bookInfo?.author || "Unknown author"}
							</Link>
						</ListItem>
						<ListItem>
							Publisher: {bookInfo?.publisher || "Unknown publisher"}
						</ListItem>
						<ListItem>Genre: {bookInfo?.genre || "Unknown genre"}</ListItem>
						<ListItem>Language: {bookInfo?.language}</ListItem>
						<ListItem>The year of publishing: {info?.year}</ListItem>
						<ListItem>Pages count: {info?.pages}</ListItem>
						{info?.rating && (
							<ListItem>
								Rating: {info?.rating}
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
