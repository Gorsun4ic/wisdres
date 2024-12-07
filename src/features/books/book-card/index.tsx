import { StyledCard, StyledCardContent } from "./style";
import StarIcon from "@mui/icons-material/Star";
import { Stack } from "@mui/material";
import theme from "@styles/theme";
import Button from "@components/button";
import { IBookInfo } from "@custom-types/book";

const BookCard: React.FC<{ data: IBookInfo }> = ({ data }) => {
	const { img, rating, title, author } = data;
	return (
		<StyledCard
			className="book-card"
			sx={{
				boxShadow: "none",
				border: `1px solid ${theme?.colors?.darkGrey}`,
			}}>
			<img src={img} className="book-card__img" width="200" height="380"/>
			<StyledCardContent>
				<Stack
					direction="row"
					spacing={0.2}
					sx={{ alignItems: "center", marginBottom: "4px" }}>
					<StarIcon color="warning" />
					<p>{rating}</p>
				</Stack>
				<h3 className="book-card__name">{title}</h3>
				<p className="book-card__author">{author}</p>
				<Button size="small">Read</Button>
			</StyledCardContent>
		</StyledCard>
	);
};

export default BookCard;
