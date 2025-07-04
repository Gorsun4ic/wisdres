import { Link } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";
import { Stack } from "@mui/material";

import { useTranslation } from "react-i18next";

import { IAuthor } from "@custom-types/author";

import Button from "@components/button/Button";

import { getLangEntity } from "@src/utils/getLangEntity";

import { scTheme } from "@styles/theme";
import { StyledCard, StyledCardContent } from "./style";
import { LangType } from "@src/i18n";

interface BookCardProps {
	data: {
		info: {
			img: string;
			rating: number;
			title: LangType;
			author: IAuthor[];
		};
		_id: string;
	};
}

const BookCard = ({ data }: BookCardProps) => {
	const { t, i18n } = useTranslation();
	const lang = i18n.language as LangType;

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
					border: `1px solid ${scTheme?.colors?.darkGrey}`,
				}}>
				<img
					src={getLangEntity(img, lang)}
					className="book-card__img"
					width="200"
					height="300"
				/>
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
						<h3 className="book-card__name">{getLangEntity(title, lang)}</h3>
						<p className="book-card__author">
							{author
								.map((author: { title: Record<LangType, string> }) =>
									getLangEntity(author.title, lang)
								)
								.join(", ")}
						</p>
					</Stack>
					<Button>{t("read")}</Button>
				</StyledCardContent>
			</StyledCard>
		</Link>
	);
};

export default BookCard;
