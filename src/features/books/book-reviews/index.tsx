import { Stack } from "@mui/material";
import ReviewsList from "./reviews-list";
import ReviewForm from "./review-form";
import { StyledBookReviews } from "./style";

const BookReviews = () => {
	return (
		<StyledBookReviews>
			<Stack
				direction="row"
				spacing={12}
				sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
				<ReviewsList />
				<ReviewForm />
			</Stack>
		</StyledBookReviews>
	);
};

export default BookReviews;
