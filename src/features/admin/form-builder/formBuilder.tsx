import { useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

// MUI
import Grid from "@mui/material/Grid2";
import { Alert } from "@mui/material";

// Store
import { RootState } from "@store/index";

// Custom types
import { AdminFormConfig } from "@custom-types/adminFormConfig";

// Custom hooks
import { useAdminForm } from "@hooks/useAdminForm";
import useWatchImg from "@hooks/useWatchImg";

// Custom components
import FormField from "@components/formField";
import Button from "@components/button";
import ConfirmAction from "@components/confirmAction";

import { StyledForm } from "./style";

const FormBuilder = ({
	config,
	mode,
	id,
}: {
	config: AdminFormConfig;
	mode: "add" | "edit";
	id?: string;
}) => {
	const { onSubmit, openDialog, handleEdit, dataById, form } = useAdminForm(
		config,
		mode,
		id
	);

	// React Hook Form
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = form;

	// Hook to track img input status
	const { img } = useWatchImg(watch);

	// Alert state
	const { alert } = useSelector((state: RootState) => state.alert);

	useEffect(() => {
		if (errors) {
			console.log("errors", errors);
		}
	}, [errors]);

	useEffect(() => {
		console.log("Mode", mode);
		console.log("Id", id);
	}, [mode, id]);

	if (openDialog) {
		return (
			<ConfirmAction
				title={`Are you confirm to change the ${dataById.title} info?`}
				openDialog={openDialog}
				onConfirm={handleEdit}
				onCancel={() => handleEdit(false)}>
				{/* {changedInfo()} */}
			</ConfirmAction>
		);
	}

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<h3 className="form-title">
				{mode === "add"
					? `Add ${config.entityName}`
					: `Edit ${config.entityName}`}
			</h3>

			<Grid container spacing={2} sx={{ marginBottom: 2 }}>
				{config.fields.map((field) => (
					<Grid size={12} key={field.name}>
						<FormField
							name={field.name}
							type={field.type}
							placeholder={field.placeholder}
							validation={field.validation}
							register={register}
							rows={field.rows}
							multiline={field.rows ? true : false}
							error={errors[field.name]?.message}
						/>
						{field.name === "img" && img && (
							<img src={img} width="256" height="256" />
						)}
					</Grid>
				))}
			</Grid>
			<Button type="submit">{mode === "edit" ? "Edit" : "Publish"}</Button>
			{alert && alert.place === "form" && (
				<Alert severity={alert.color} sx={{ marginTop: "16px" }}>
					{alert.title}
				</Alert>
			)}
		</StyledForm>
	);
};

export default FormBuilder;
