import { useState } from "react";
import { StyledSlider } from "./style";

function valuetext(value: number) {
	return `${value}°C`;
}

export default function RangeSlider() {
	const [value, setValue] = useState<number[]>([20, 37]);

	const handleChange = (event: Event, newValue: number | number[]) => {
		setValue(newValue as number[]);
	};

	return (
		<StyledSlider
			getAriaLabel={() => "Temperature range"}
			value={value}
			max={128}
			min={42}
			onChange={handleChange}
			valueLabelDisplay="auto"
			getAriaValueText={valuetext}
		/>
	);
}
