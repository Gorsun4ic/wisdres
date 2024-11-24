import { List, Stack } from "@mui/material";
import useGetAmount from "@hooks/useGetAmount";
import StarIcon from "@mui/icons-material/Star";
import { StyledReviewsList } from "./style";

interface Review {
	author: string;
	date: string;
	rating: number;
	text: string;
}

const reviewsArr: Review[] = [
	{
		author: "John Doe",
		date: "2024-11-20",
		rating: 8,
		text: "Great product! The quality exceeded my expectations, and it works as described. I would definitely recommend it to others.",
	},
	{
		author: "Jane Smith",
		date: "2024-11-19",
		rating: 5,
		text: "It's decent, but I expected more for the price. The functionality is good, but the build quality could be improved.",
	},
	{
		author: "Emily Johnson",
		date: "2024-11-18",
		rating: 9,
		text: "Excellent! This exceeded my expectations in every way. The customer service was also fantastic. Highly recommend this product to anyone looking for reliability.",
	},
	{
		author: "Michael Brown",
		date: "2024-11-17",
		rating: 3,
		text: "Unfortunately, this didn't meet my expectations. It stopped working after a few days of use, and I had trouble with customer support. Disappointed.",
	},
];


const ReviewItem = (data: Review) => {
	const {author, date, rating, text} = data;
	return (
		<div className="review__item">
			<Stack className="review__heading" direction="row" sx={{justifyContent: "space-between"}}>
				<h4 className="review__name">{author}</h4>
				<time dateTime={date}>{date}</time>
			</Stack>
			<Stack direction="row" className="review__rating" sx={{alignItems: "center", marginBottom: 0.5}}>
				<p>Rating: {rating}</p>
				<StarIcon color="warning" />
			</Stack>
			<p className="review__text">{text}</p>
		</div>
	);
}

const ReviewsList = () => {

	const reviewsAmount = useGetAmount(reviewsArr);

	const list = reviewsArr.map(item => {
		const { author, date, rating, text } = item;
	
		return (
			<ReviewItem author={author} date={date} rating={rating} text={text}/>
		)
	})

	return (
		<StyledReviewsList>
			<h3>Reviews ({reviewsAmount})</h3>
			<List>{list}</List>
		</StyledReviewsList>
	);
};

export default ReviewsList;
