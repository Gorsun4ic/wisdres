import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { Stack, Pagination } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useTranslation } from "react-i18next";

import { useGetBooksByGenresQuery } from "@api/apiBooksSlice";

import { IFilter } from "@reducers/filters";

import { useBookFilters } from "@hooks/useBookFilters";

import upperCaseFirstLetter from "@utils/upperCaseFirstLetter";

import BookFilters from "@features/books/book-filters/bookFilters";
import BookList from "@features/books/book-list";
import BookSort from "@features/books/book-sort";

import { StyledGenrePage } from "./style";

const GenrePage = () => {
	const { genre = "" } = useParams<{ genre: string }>();
	const { t } = useTranslation();
	const [page, setPage] = useState(1);
	const { data } = useGetBooksByGenresQuery({ genre: genre, limit: 25, page: page });
	const { sortBy, filters } = useSelector(
		(state: { filters: IFilter }) => state.filters
	);
	const { filterData, sortedBooks, updateFilterData } = useBookFilters(
		data?.books || [],
		sortBy,
		filters
	);

	useEffect(() => {
		if (data) {
			updateFilterData();
		}
	}, [data, updateFilterData]);

	const genreTitle = upperCaseFirstLetter(genre);

	return (
		<StyledGenrePage>
			<h2 className="genre-name">{genreTitle}</h2>
			<Stack
				className="genre-layout"
				direction="row"
				gap={2}
				sx={{ alignItems: "flex-start" }}>
				<BookFilters data={filterData} />
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
							{data?.length} {t("books")}
						</p>
						{data?.books?.length > 0 && <BookSort />}
					</Stack>
					<Stack>
						<BookList data={sortedBooks} />
						{data?.books?.length > 0 && (
							<Pagination
								sx={{ marginBottom: 4 }}
								count={Math.ceil(data?.totalBooks / 25)}
								page={page}
								onChange={(_, value) => setPage(value)}
							/>
						)}
						{data?.books?.length === 0 && <p>{t("noBooksFound")}</p>}
					</Stack>
				</Stack>
			</Stack>
		</StyledGenrePage>
	);
};

export default GenrePage;
