import { useEffect, ReactNode, useCallback } from "react";
import { useForm } from "react-hook-form";

import { CircularProgress, Grid2 } from "@mui/material";

import ErrorMessage from "@components/error";
import FormField from "@components/formField";
import Button from "@components/button";

import { StyledForm } from "./style";

type ReusableFormProps<T> = {
	fields: FieldConfig[];
	initialData?: T;
	mode: "add" | "edit";
	title: string;
	isLoading?: boolean;
	error?: string | null;
	onSubmit: (data: T) => void;
	onCancel?: () => void;
};

// Define the hook
export const useAdminSubmitHandler = ({
	addData,
	triggerAlert,
	setOpenDialog,
	setDataToEdit,
	onEditMode,
	alertTitle,
}) => {
	const handleAdminSubmit = useCallback(
		(mode, dataId) => {
			return (data) => {
				switch (mode) {
					case "add":
						addData(data);
						triggerAlert({
							title: alertTitle,
							color: "success",
						});
						break;
					case "edit":
						setOpenDialog(true);
						setDataToEdit(data);
						break;
					default:
						console.warn(`Unknown mode: ${mode}`);
				}
				onEditMode(mode, dataId);
			};
		},
		[addData, triggerAlert, setOpenDialog, setDataToEdit, onEditMode]
	);

	return { handleAdminSubmit };
};

const AdminForm = ({
	fields,
	title,
	onSubmit,
	initialData,
	error,
	isLoading,
	mode,
}: ReusableFormProps<T>) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitSuccessful },
	} = useForm<T>();

	useEffect(() => {
		if (initialData) {
			reset(initialData);
		}
	}, [initialData, reset]);

	// Reset fields on success
	useEffect(() => {
		if (isSubmitSuccessful) reset();
	}, [isSubmitSuccessful, reset]);

	const fieldsList = fields.map((field) => (
		<Grid2 size={6} key={field.name}>
			<FormField
				name={field.name}
				placeholder={field.placeholder}
				type={field.type || "text"}
				register={register}
				validation={field.validation}
				error={errors[field.name]?.message}
			/>
		</Grid2>
	));

	if (isLoading) {
		return <CircularProgress sx={{ display: "block", margin: "0 auto" }} />;
	} else if (error) {
		return <ErrorMessage />;
	}

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)} className="reusable-form">
			<h3 className="form-title">{title}</h3>
			<Grid2 container spacing={6} rowSpacing={3} sx={{ marginBottom: 3 }}>
				{fieldsList}
			</Grid2>
			<div className="form-actions">
				<Button size="big" submit={true}>
					{mode === "edit" ? "Edit" : "Publish"}
				</Button>
			</div>
		</StyledForm>
	);
};

export default AdminForm;
