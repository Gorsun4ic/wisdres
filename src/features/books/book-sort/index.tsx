import { useState } from "react";
import { useDispatch } from "react-redux";

import { Stack, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { useTranslation } from "react-i18next";

import { sortBy } from "@reducers/filters";

import { StyledBookSort } from "./style";

const BookSort = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const [isActive, setIsActive] = useState<number | null>(null);

	const sortCriteria: [string, string][] = [
		["reviews", t("reviews")],
		["rating", t("rating")],
	];

	const handleClick = (criteria: string) => {
		dispatch(sortBy(criteria.toLowerCase()));
	};

	// Check is the element is not last
	const isElementLast = (i: number, arr: [string, string][]) => {
		return i === arr.length - 1;
	};

	return (
		<StyledBookSort
			direction="row"
			className="book-sort"
			gap={1}
			sx={{ alignItems: "center" }}>
			<p>{t("sort")}:</p>
			{sortCriteria.map((item, i, arr) => {
				return (
					<Stack
						className="sort-list"
						direction="row"
						gap={1}
						sx={{ alignItems: "center" }}>
						<Typography
							onClick={() => {
								handleClick(item[0]);
								setIsActive(i);
							}}
							sx={{
								cursor: "pointer",
								fontWeight: isActive === i ? "600" : "normal",
								color: isActive === i ? "#5EB168" : null,
							}}>
							{item[1]}
						</Typography>
						{!isElementLast(i, arr) && <FiberManualRecordIcon />}
					</Stack>
				);
			})}
		</StyledBookSort>
	);
};

export default BookSort;
