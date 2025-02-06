import { Link } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";
import { Stack } from "@mui/material";

import { IBook } from "@custom-types/book";

import Button from "@components/button";

import theme from "@styles/theme";
import { StyledCard, StyledCardContent } from "./style";
import { IAuthor } from "@custom-types/author";

const BookCard: React.FC<{ data: IBook }> = ({
	data = {
		info: {
			img: "",
			rating: 0,
			title: "",
			author: [],
		},
		_id: "",
		details: { book: "", auditory: "" },
		reviews: [],
	},
}) => {
	const { info, _id } = data;
	const { img, rating, title, author } = info;

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
						<p className="book-card__author">
							{Array.isArray(author)
								? author.map((author: IAuthor, index: number) => (
										<span key={index}>
											{author?.title}
											{index < author.length - 1 ? ", " : ""}
										</span>
								  ))
								: ""}
						</p>
					</Stack>
					<Button size="small">Read</Button>
				</StyledCardContent>
			</StyledCard>
		</Link>
	);
};

export default BookCard;
