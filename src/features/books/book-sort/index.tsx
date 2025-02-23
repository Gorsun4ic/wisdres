import { useState } from "react";
import { useDispatch } from "react-redux";


import { Stack, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { sortBy } from "@reducers/filters";

import { StyledBookSort } from "./style";

const BookSort = () => {
	const dispatch = useDispatch();
	const [isActive, setIsActive] = useState<number | null>(null);

	const sortCriteria: string[] = ["Reviews", "Downloads", "Rating"];

	const handleClick = (criteria: string) => {
		dispatch(sortBy(criteria.toLowerCase()));
	}

	// Check is the element is not last
	const isElementLast = (i:number, arr:string[]) => {
		return i === arr.length - 1;
	}

	return (
		<StyledBookSort direction="row" className="book-sort" gap={1} sx={{alignItems: "center"}}>
			<p>Sort by:</p>
			{sortCriteria.map((item, i, arr) => {
				return (
					<Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
						<Typography
							onClick={() => {
								handleClick(item);
								setIsActive(i);
							}}
							sx={{
								cursor: "pointer",
								fontWeight: isActive === i ? "600" : "normal",
								color: isActive === i ? "#5EB168" : null,
							}}>
							{item}
						</Typography>
						{!isElementLast(i, arr) && <FiberManualRecordIcon />}
					</Stack>
				);
			})}
		</StyledBookSort>
	);
};

export default BookSort;
