import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { Stack, Pagination } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useTranslation } from "react-i18next";

import { useGetBooksByGenresQuery } from "@api/apiBooksSlice";
import { useGetGenresQuery } from "@src/api/apiGenresSlice";

import { IFilter } from "@reducers/filters";

import { useBookFilters } from "@hooks/useBookFilters";

import BookFilters from "@features/books/book-filters/bookFilters";
import BookList from "@features/books/book-list";
import BookSort from "@features/books/book-sort";

import ErrorMessage from "@components/error";

import upperCaseFirstLetter from "@utils/upperCaseFirstLetter";

import { LangType } from "@src/i18n";

import { StyledGenrePage } from "./style";

const GenrePage = () => {
	const { genre = "" } = useParams<{ genre: string }>();
	const { data: genres } = useGetGenresQuery();
	const { t, i18n } = useTranslation();
	const lang = i18n.language as LangType;
	const [page, setPage] = useState(1);
	const { data, isLoading } = useGetBooksByGenresQuery({
		genre: genre,
		limit: 20,
		page: page,
	});
	const { sortBy, filters } = useSelector(
		(state: { filters: IFilter }) => state.filters
	);
	const booksData = data?.success && data.data ? data.data : null;
	const books = booksData?.books ?? [];
	const totalBooks = booksData?.totalBooks ?? 0;

	const { filterData, sortedBooks } = useBookFilters(books, sortBy, filters);

	const genreSlug = genre.toLowerCase();

	const matchedGenre = genres?.data?.find(
		(g) => g.title?.en?.toLowerCase() === genreSlug
	);

	const genreTitle = matchedGenre?.title?.[lang] ?? upperCaseFirstLetter(genre);


	return (
		<StyledGenrePage>
			<h2 className="genre-name">{genreTitle}</h2>
			<Stack
				className="genre-layout"
				direction="row"
				gap={2}
				sx={{ alignItems: "flex-start" }}>
				<ErrorBoundary
					fallback={<ErrorMessage>{t("failedToLoadFilters")}</ErrorMessage>}>
					<BookFilters data={filterData} isLoading={isLoading} />
				</ErrorBoundary>

				<Stack sx={{ width: "100%" }}>
					<Link to=".." relative="path">
						<Stack
							direction="row"
							sx={{
								alignItems: "center",
								justifyContent: "space-between",
								maxWidth: 140,
								marginBottom: 4,
							}}>
							<ArrowBackIcon />
							<h4>{t("previousPage")}</h4>
						</Stack>
					</Link>
					<Stack
						direction="row"
						className="genre-sort"
						gap={2}
						sx={{ justifyContent: "space-between", marginBottom: 3 }}>
						<p className="book-amount">
							{books?.length} {t("books")}
						</p>
						{books.length > 0 && <BookSort />}
					</Stack>
					<Stack>
						<ErrorBoundary
							fallback={<ErrorMessage>{t("failedToLoadBooks")}</ErrorMessage>}>
							<BookList data={sortedBooks} isLoading={isLoading} />
						</ErrorBoundary>

						{books.length > 0 && (
							<Pagination
								sx={{ marginBottom: 4 }}
								count={Math.ceil(totalBooks / 20)}
								page={page}
								onChange={(_, value) => setPage(value)}
							/>
						)}
						{books.length === 0 && <p>{t("noBooksFound")}</p>}
					</Stack>
				</Stack>
			</Stack>
		</StyledGenrePage>
	);
};

export default GenrePage;
