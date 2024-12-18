import { useEffect } from "react";
import { useSelector } from "react-redux";

import { List, ListItem, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { useLazyGetBookInfoQuery } from "@api/apiBooksSlice";

import useShowAuthorsName from "@hooks/useShowAuthorsName";

import Button from "@components/button";

import { StyledBookInfo } from "./style";

const BookInfo = () => {
	const { activeBookPage } = useSelector((state: RootState) => state);
	const bookId = activeBookPage?.activeBook?._id;
	const [getInfoById, { data: info }] = useLazyGetBookInfoQuery();
	const { getAuthorsNameElem } = useShowAuthorsName();
	const authorsName = getAuthorsNameElem(info?.author);

	useEffect(() => {
		getInfoById(bookId);
	}, [getInfoById, bookId, info]);

	return (
		<StyledBookInfo>
			<Stack direction="row" gap={4}>
				<img src={info?.img} alt={info?.title} width="350" height="500" />
				<div>
					<h1 className="book-title">{info?.title}</h1>
					<List>
						<ListItem>Author: {authorsName}</ListItem>
						<ListItem>Publisher: {info?.publisher}</ListItem>
						<ListItem>Genre: {info?.genre}</ListItem>
						<ListItem>Language: {info?.language}</ListItem>
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
