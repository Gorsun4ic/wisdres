import { Stack } from "@mui/material";
import Form from "@components/form";
import ReviewsList from "./reviews-list";
import { StyledBookReviews } from "./style";

const BookReviews = () => {
	return (
		<StyledBookReviews>
			<Stack direction="row" spacing={12} sx={{justifyContent: "space-between"}}>
				<ReviewsList />
				<Form />
			</Stack>
		</StyledBookReviews>
	);
};

export default BookReviews;
