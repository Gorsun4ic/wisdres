import React from "react";
import { TextField } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

interface FormFieldProps<T> {
	name: keyof T;
	placeholder: string;
	register: UseFormRegister<T>;
	validation?: Record<string, unknown>;
	error?: string;
	multiline?: boolean;
	rows?: number;
	type?: string;
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
}: FormFieldProps<T>) => {
	return (
		<>
			<p className="input-label">{placeholder}</p>
			<TextField
				{...register(name, validation)} // Spread the register function's returned object
				placeholder={placeholder}
				error={!!error}
				helperText={error}
				multiline={multiline}
				rows={rows}
				type={type}
				sx={{ width: "100%" }}
			/>
		</>
	);
};

export default FormField;
