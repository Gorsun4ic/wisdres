import ReviewsList from "./reviews-list/reviewList";
import ReviewForm from "./review-form/reviewForm";
import { StyledBookReviews } from "./style";

const BookReviews = () => {
	return (
		<StyledBookReviews>
			<ReviewsList />
			<ReviewForm />
		</StyledBookReviews>
	);
};

export default BookReviews;
