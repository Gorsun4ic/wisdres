import { Stack, Link } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BookList from "@features/books/book-list";
import theme from "@styles/theme";
import { StyledBookCollection } from "./style";

const BookCollection = ({ title }: { title: string }) => {
	return (
		<StyledBookCollection className="collection">
			<Stack
				direction="row"
				sx={{
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: 2.5,
				}}
				spacing={2}>
				<h2>{title}</h2>
				<Link
					href="#"
					underline="none"
					sx={{
						color: theme?.colors?.green,
						fontWeight: theme?.fontWeights?.medium,
					}}>
					<Stack
						direction="row"
						sx={{ alignItems: "center", justifyContent: "space-between" }}>
						Watch all
						<ArrowForwardIcon />
					</Stack>
				</Link>
			</Stack>
			<BookList />
		</StyledBookCollection>
	);
};

export default BookCollection;