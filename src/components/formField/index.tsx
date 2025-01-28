import { TextField } from "@mui/material";
import { ReactNode } from "react";
import { UseFormRegister, Path, FieldValues } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
	name:  Path<T>;
	placeholder: string;
	register: UseFormRegister<T>;
	validation?: Record<string, unknown>;
	error?: string;
	multiline?: boolean;
	rows?: number;
	type?: string;
	icon?: ReactNode;
	endIcon?: ReactNode;
}

const FormField = <T extends Record<string, unknown>>({
	name,
	placeholder,
	register,
	validation,
	error,
	multiline = false,
	rows,
	type = "string",
	icon ,
	endIcon
}: FormFieldProps<T>) => {
	return (
		<TextField
			{...register(name, validation)} // Spread the register function's returned object
			placeholder={placeholder}
			error={!!error}
			helperText={error}
			multiline={multiline}
			slotProps={{
				input: {
					startAdornment: icon,
					endAdornment: endIcon
				},
			}}
			rows={rows}
			type={type}
			sx={{ width: "100%", borderColor: error ? "red" : null }}
		/>
	);
};

export default FormField;
