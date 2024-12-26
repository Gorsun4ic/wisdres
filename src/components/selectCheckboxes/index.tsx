
import { useState, useRef } from "react";
import { Controller, FieldValues, Control } from "react-hook-form";
import {
	Select,
	MenuItem,
	FormControl,
	OutlinedInput,
	InputLabel,
	SelectChangeEvent,
} from "@mui/material";

import Checkbox from "@components/checkbox";

const SelectCheckboxes = ({
	dataList,
	name,
	control,
	label,
}: {
	dataList: { title: string }[];
	name: string;
	control: Control<FieldValues>;
	label: string;
}) => {
	const [data, setData] = useState<string[]>([]);
	const selectRef = useRef<HTMLDivElement>(null);

	const ITEM_HEIGHT = 40;
	const ITEM_PADDING_TOP = 0;

	const MenuProps = {
		PaperProps: {
			sx: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: selectRef.current
					? `${selectRef.current.offsetWidth}px`
					: "auto",
			},
		},
	};

	const handleChange = (event: SelectChangeEvent<string[]>) => {
		const {
			target: { value },
		} = event;
		setData(typeof value === "string" ? value.split(",") : value);
	};

	return (
		<FormControl sx={{ width: "100%" }}>
			<InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						ref={selectRef}
						labelId="demo-multiple-checkbox-label"
						sx={{ width: "100%" }}
						id="demo-multiple-checkbox"
						multiple
						value={data}
						onChange={handleChange}
						input={<OutlinedInput label={label} />}
						renderValue={(selected) => selected.join(", ")}
						MenuProps={MenuProps}>
						{dataList?.map((item, index) => (
							<MenuItem
								key={index}
								value={item?.title} // Added missing value prop
								sx={{ height: ITEM_HEIGHT }}>
								<Checkbox
									label={item?.title}
									checked={data.includes(item?.title)}
									onChange={() => {
										const newValue = (field.value || []).includes(item?.title)
											? field.value.filter(
													(value: string) => value !== item?.title
											  )
											: [...(field.value || []), item?.title];
										field.onChange(newValue);
									}} 
								/>
							</MenuItem>
						))}
					</Select>
				)}
			/>
		</FormControl>
	);
};

export default SelectCheckboxes;
