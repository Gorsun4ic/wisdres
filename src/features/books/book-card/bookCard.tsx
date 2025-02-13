import { Link } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";
import { Stack } from "@mui/material";

import { IBook } from "@custom-types/book";

import Button from "@components/button";

import theme from "@styles/theme";
import { StyledCard, StyledCardContent } from "./style";
import { IAuthor } from "@custom-types/author";

interface BookCardProps {
	data: IBook;
}

const BookCard: React.FC<BookCardProps> = ({ data }) => {
	if (!data || !data.info) {
		return null;
	}

	const { info, _id } = data;
	const { img, rating, title, author } = info;

	const renderAuthors = () => {
		if (!Array.isArray(author) || !author.length) {
			return "Unknown author";
		}

		return author.map((auth: IAuthor, index: number) => (
			<span key={auth._id || index}>
				{auth?.title}
				{index < author.length - 1 ? ", " : ""}
			</span>
		));
	};

	return (
		<Link to={`/book/${_id}`}>
			<StyledCard
				className="book-card"
				sx={{
					boxShadow: "none",
					border: `1px solid ${theme?.colors?.darkGrey}`,
				}}>
				<img src={img} className="book-card__img" width="200" height="300" />
				<StyledCardContent>
					<Stack>
						{rating && (
							<Stack
								direction="row"
								spacing={0.2}
								sx={{ alignItems: "center", marginBottom: "4px" }}>
								<StarIcon color="warning" />
								<p>{rating}</p>
							</Stack>
						)}
						<h3 className="book-card__name">{title}</h3>
						<p className="book-card__author">{renderAuthors()}</p>
					</Stack>
					<Button size="small">Read</Button>
				</StyledCardContent>
			</StyledCard>
		</Link>
	);
};

export default BookCard;
