import { Stack } from "@mui/material";
import BookFilters from "@features/books/book-filters";
import BookList from "@features/books/book-list";
import BookSort from "@features/books/book-sort";
import { StyledGenrePage } from "./style";

const GenrePage = () => {
	return (
		<StyledGenrePage>
			<h2 className="genre-name">Fantasy</h2>
			<Stack direction="row" gap={2} sx={{ alignItems: "flex-start" }}>
				<BookFilters />
				<Stack>
					<Stack
						direction="row"
						gap={2}
						sx={{ justifyContent: "space-between", marginBottom: 3 }}>
						<p className="book-amount">543 Books</p>
						<BookSort />
					</Stack>
					<Stack>
						<BookList />
					</Stack>
				</Stack>
			</Stack>
		</StyledGenrePage>
	);
}

export default GenrePage;