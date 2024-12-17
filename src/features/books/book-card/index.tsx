import { Link } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";
import { Stack } from "@mui/material";

import { IBookInfo } from "@custom-types/book";

import useShowAuthorsName from "@hooks/useShowAuthorsName";

import Button from "@components/button";

import theme from "@styles/theme";
import { StyledCard, StyledCardContent } from "./style";

const BookCard: React.FC<{ data: IBookInfo }> = ({ data }) => {
	const { img, rating, title, author, _id } = data;
	const {getAuthorsNameElem} = useShowAuthorsName();
	const authorsName = getAuthorsNameElem(author);

	return (
		<Link to={`book/${_id}`}>
			<StyledCard
				className="book-card"
				sx={{
					boxShadow: "none",
					border: `1px solid ${theme?.colors?.darkGrey}`,
				}}>
				<img src={img} className="book-card__img" width="200" height="380" />
				<StyledCardContent>
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
					<p className="book-card__author">{authorsName}</p>
					<Button size="small">Read</Button>
				</StyledCardContent>
			</StyledCard>
		</Link>
	);
};

export default BookCard;
