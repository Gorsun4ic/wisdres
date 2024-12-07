import { TextField } from "@mui/material";

interface FormFieldProps<T> {
	name: keyof T; // Ensure this matches your form field structure
	placeholder: string;
	register: (
		name: keyof T,
		rules?: Record<string, unknown>
	) => Record<string, unknown>; // Register function's return is an object for spreading
	validation?: Record<string, unknown>; // Validation rules
	error?: string; // Error message
	size?: number; // Grid size
	multiline?: boolean; // Multiline support
	rows?: number; // Number of rows for multiline
	type?: string; // Content type (number|string)
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
				{...register(name, validation)} // Ensures the returned object can be spread
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