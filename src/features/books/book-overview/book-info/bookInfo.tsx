import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { List, ListItem, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { useTranslation } from "react-i18next";

import { useLazyGetBookInfoQuery } from "@api/apiBooksSlice";

import Button from "@components/button";

import { StyledBookInfo } from "./style";

import { LangType } from "@src/i18n";

import { getLangEntity } from "@src/utils/getLangEntity";

const BookInfo = () => {
	const { bookId } = useParams();

	const { t, i18n } = useTranslation();
	const lang = i18n.language as LangType;

	const [getInfoById, { data: bookInfo }] = useLazyGetBookInfoQuery();
	const data = bookInfo?.data;

	useEffect(() => {
		if (bookId) {
			getInfoById(bookId);
		}
	}, [getInfoById, bookId]);

	if (!data) {
		return null;
	}

	return (
		<StyledBookInfo>
			<img
				src={getLangEntity(data?.img, lang)}
				alt={getLangEntity(data?.title, lang)}
				width="350"
				height="500"
			/>
			<div>
				<h1 className="book-title">{getLangEntity(data?.title, lang)}</h1>
				<List>
					<ListItem>
						{t("author")}
						{Array.isArray(data?.author) ? (
							<Stack direction="row" gap={1}>
								{data.author.map((author, index) => (
									<span key={author._id}>
										<Link to={`/author/${author._id}`}>
											{author.title[lang]}
										</Link>
										{index < data.author.length - 1 ? ", " : " "}
									</span>
								))}
							</Stack>
						) : (
							t("unknownAuthor")
						)}
					</ListItem>
					{data?.publisher && (
						<ListItem>
							{t("publisher")}:
							<Link to={`/publisher/${data?.publisher?._id}`}>
								{data?.publisher?.title}
							</Link>
						</ListItem>
					)}
					<ListItem>
						{t("genres")}:{" "}
						{Array.isArray(data?.genre)
							? data.genre.map((genre, index) => (
									<span key={genre._id}>
										{genre.title[lang]}
										{index < data.genre.length - 1 ? ", " : ""}
									</span>
							  ))
							: t("unknownGenre")}
					</ListItem>
					<ListItem>
						{t("language")}:{" "}
						{data?.language?.title[lang] || t("unknownLanguage")}
					</ListItem>
					<ListItem>
						{t("yearOfPublishing")}: {data?.year}
					</ListItem>
					<ListItem>
						{t("pagesCount")}: {data?.pages}
					</ListItem>
					{data?.rating && (
						<ListItem>
							{t("rating")}: {data?.rating}
							<StarIcon color="warning" />
						</ListItem>
					)}
				</List>
				<Link to={data.link[lang]}>
					<Button size="big">{t("download")}</Button>
				</Link>
			</div>
		</StyledBookInfo>
	);
};

export default BookInfo;
