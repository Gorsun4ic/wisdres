import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { List, ListItem, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { useTranslation } from "react-i18next";

import { useLazyGetBookInfoQuery } from "@api/apiBooksSlice";

import Button from "@components/button";

import { StyledBookInfo } from "./style";

const BookInfo = () => {
	const { bookId } = useParams();

	const { t, i18n } = useTranslation();
	const lang = i18n.language;

	const [getInfoById, { data: bookInfo }] = useLazyGetBookInfoQuery();
	const data = bookInfo?.data;

	useEffect(() => {
		if (bookId) {
			getInfoById(bookId);
		}
	}, [getInfoById, bookId]);

	return (
		<StyledBookInfo>
			<img src={bookInfo?.img[lang]} alt={bookInfo?.title[lang]} width="350" height="500" />
			<div>
				<h1 className="book-title">{bookInfo?.title[lang]}</h1>
				<List>
					<ListItem>
						{t("author")}
						{bookInfo?.author?.length > 1 ? "s" : ""}:{" "}
						{Array.isArray(bookInfo?.author) ? (
							<Stack direction="row" gap={1}>
								{bookInfo.author.map((author, index) => (
									<span key={author._id}>
										<Link to={`/author/${author._id}`}>
											{author.title[lang]}
										</Link>
										{index < bookInfo.author.length - 1 ? ", " : " "}
									</span>
								))}
							</Stack>
						) : (
							t("unknownAuthor")
						)}
					</ListItem>
					{bookInfo?.publisher && (
						<ListItem>
							{t("publisher")}:
							<Link to={`/publisher/${bookInfo?.publisher?._id}`}>
								{bookInfo?.publisher?.title}
							</Link>
						</ListItem>
					)}
					<ListItem>
						{t("genres")}:{" "}
						{Array.isArray(bookInfo?.genre)
							? bookInfo.genre.map((genre, index) => (
									<span key={genre._id}>
										{genre.title[lang]}
										{index < bookInfo.genre.length - 1 ? ", " : ""}
									</span>
							  ))
							: t("unknownGenre")}
					</ListItem>
					<ListItem>
						{t("language")}: {bookInfo?.language?.title[lang] || t("unknownLanguage")}
					</ListItem>
					<ListItem>
						{t("yearOfPublishing")}: {bookInfo?.year}
					</ListItem>
					<ListItem>
						{t("pagesCount")}: {bookInfo?.pages}
					</ListItem>
					{bookInfo?.rating && (
						<ListItem>
							{t("rating")}: {bookInfo?.rating}
							<StarIcon color="warning" />
						</ListItem>
					)}
				</List>
				<Link to={bookInfo?.link[lang]}>
					<Button size="big">{t("download")}</Button>
				</Link>
			</div>
		</StyledBookInfo>
	);
};

export default BookInfo;
