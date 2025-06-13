import { Link } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";
import { Stack } from "@mui/material";

import { useTranslation } from "react-i18next";

import { IAuthor } from "@custom-types/author";

import Button from "@components/button";

import theme from "@styles/theme";
import { StyledCard, StyledCardContent } from "./style";

interface BookCardProps {
	data: {
		info: {
			img: string;
			rating: number;
			title: string;
			author: IAuthor[];
		};
		_id: string;
	};
}

const BookCard = ({ data }: BookCardProps) => {

	const { t, i18n } = useTranslation();
	const lang = i18n.language;

	const { info, _id } = data;
	const { img, rating, title, author } = info;

	if (!data.info) {
		return null;
	}

	return (
		<Link to={`/book/${_id}`}>
			<StyledCard
				sx={{
					boxShadow: "none",
					border: `1px solid ${theme?.colors?.darkGrey}`,
				}}>
				<img src={img[lang] ? img[lang] : img} className="book-card__img" width="200" height="300" />
				<StyledCardContent>
					<Stack>
						{rating ? (
							<Stack
								direction="row"
								spacing={0.2}
								sx={{ alignItems: "center", marginBottom: "4px" }}>
								<StarIcon color="warning" />
								<p>{rating && rating > 0 ? rating : null}</p>
							</Stack>
						) : null}
						<h3 className="book-card__name">{title[lang] ? title[lang] : title}</h3>
						<p className="book-card__author">
							{author
								.map((auth: { title: string }) => auth.title[lang] ? auth.title[lang] : auth.title)
								.join(", ")}
						</p>
					</Stack>
					<Button size="small">{t("read")}</Button>
				</StyledCardContent>
			</StyledCard>
		</Link>
	);
};

export default BookCard;
