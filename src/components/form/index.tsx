import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { TextField, Rating, Grid2 } from "@mui/material";
import Button from "@components/button";
// @ts-expect-error Cuz it's old library and it's have type any, but it's strings array
import badwordsArray from "badwords/array";
import { StyledForm } from "./style";

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
}
type FormFields = {
	rating: number;
	name: string;
	email: string;
	text: string;
};

const FormField = <T extends Record<string, unknown>>({
	name,
	placeholder,
	register,
	validation,
	error,
	size = 12,
	multiline = false,
	rows,
}: FormFieldProps<T>) => {
	return (
		<Grid2 size={size}>
			<TextField
				{...register(name, validation)} // Ensures the returned object can be spread
				placeholder={placeholder}
				error={!!error}
				helperText={error}
				multiline={multiline}
				rows={rows}
				sx={{ width: "100%" }}
			/>
		</Grid2>
	);
};

const containsBadWords = (input: string): boolean => {
	const regex = new RegExp(`\\b(${badwordsArray.join("|")})\\b`, "i");
	return regex.test(input);
};

const Form = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormFields>();
	const onSubmit: SubmitHandler<FormFields> = (data) => {
		console.log(data);
	};

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)} className="rating-form">
			<h3>Write your review</h3>
			<Controller
				name="rating"
				control={control}
				defaultValue={5}
				rules={{ required: true }}
				render={({ field }) => (
					<Rating
						name="rating"
						defaultValue={5}
						max={10}
						onChange={(_, newValue) => field.onChange(newValue)}
					/>
				)}
			/>
			<Grid2 container spacing={6} rowSpacing={3} sx={{ marginBottom: 3 }}>
				<FormField<FormFields>
					name="name"
					placeholder="Your name"
					register={register}
					validation={{
						required: "Name is required",
						minLength: {
							value: 2,
							message: "Name must have at least 2 characters",
						},
						validate: (value: string) =>
							!containsBadWords(value) ||
							"Your input contains inappropriate words",
					}}
					error={errors.name?.message}
					size={6}
				/>
				<FormField<FormFields>
					name="email"
					placeholder="Your email"
					register={register}
					validation={{
						required: "Email is required",
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: "Invalid email address",
						},
						minLength: {
							value: 5,
							message: "Email must have at least 5 characters",
						},
						validate: (value: string) =>
							!containsBadWords(value) ||
							"Your input contains inappropriate words",
					}}
					error={errors.email?.message}
					size={6}
				/>
				<FormField<FormFields>
					name="text"
					placeholder="Your review"
					register={register}
					validation={{
						required: "Review is required",
						minLength: {
							value: 4,
							message: "Review must have at least 4 characters",
						},
						validate: (value: string) =>
							!containsBadWords(value) ||
							"Your input contains inappropriate words",
					}}
					error={errors.text?.message}
					size={12}
					multiline
					rows={4}
				/>
			</Grid2>
			<Button size="big" submit={true}>
				Publish
			</Button>
		</StyledForm>
	);
};

export default Form;
