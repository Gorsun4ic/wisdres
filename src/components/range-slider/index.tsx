import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageFilter } from "@reducers/filters";

import { Slider, Stack, TextField } from "@mui/material";
import { StyledSlider } from "./style";

function valuetext(value: number) {
	return `${value}`;
}

const RangeSlider = ({pageDiapason}: {pageDiapason: [number, number]}) => {
	const [value, setValue] = useState<[number, number]>([0, 1144]);
	const [minPage, maxPage] = pageDiapason;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setPageFilter(value));
	}, [value, dispatch]);

	useEffect(() => {
		if (pageDiapason) {
			setValue([minPage, maxPage]);
		}
	}, [pageDiapason, maxPage, minPage]);

	const handleChange = (event: Event, newValue: [number, number]) => {
		setValue(newValue as [number, number]);
	};

	const setInputsValue = (order: number, inputValue: string) => {
		const numericValue = parseInt(inputValue, 10);
		if (!isNaN(numericValue)) {
			setValue((prevValue) => {
				const newValue = [...prevValue];
				newValue[order] = Math.min(Math.max(numericValue, 1), 1144); // Clamp within min and max
				return newValue;
			});
		}
	};

	return (
		<StyledSlider>
			<span>Page count</span>
			<Slider
				getAriaLabel={() => "Page count range"}
				defaultValue={maxPage}
				value={value}
				max={maxPage}
				min={minPage}
				onChange={handleChange}
				valueLabelDisplay="auto"
				getAriaValueText={valuetext}
			/>
			<Stack direction="row" sx={{ alignItems: "center", gap: 2 }}>
				<Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
					<span>From</span>
					<TextField
						placeholder={value[0].toString()}
						value={value[0]}
						onChange={(e) => setInputsValue(0, e.target.value)}
					/>
				</Stack>
				<Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
					<span>To</span>
					<TextField
						placeholder={value[1].toString()}
						value={value[1]}
						onChange={(e) => setInputsValue(1, e.target.value)}
					/>
				</Stack>
			</Stack>
		</StyledSlider>
	);
}

export default RangeSlider;