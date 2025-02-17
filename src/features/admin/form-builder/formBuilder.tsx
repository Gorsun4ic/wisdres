import { useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

// MUI
import Grid from "@mui/material/Grid2";
import { Alert } from "@mui/material";

// Store
import { RootState } from "@store/index";

// Custom types
import { FormFieldConfig } from "@custom-types/adminFormConfig";
import { IGenre } from "@custom-types/genre";
import { IAuthor } from "@custom-types/author";
import { IPublisher } from "@custom-types/publisher";
import { ILanguage } from "@custom-types/language";

// Custom hooks
import { useAdminForm } from "@hooks/useAdminForm";
import useWatchImg from "@hooks/useWatchImg";

// Custom components
import FormField from "@components/formField";
import Button from "@components/button";
import ConfirmAction from "@components/confirmAction";
import ChangedInfo from "@components/changedInfo/changedInfo";

import { StyledForm } from "./style";
import AutoCompleteField from "@components/autoCompleteField";
import SelectCheckboxes from "@components/selectCheckboxes";

const FormBuilder = ({
	config,
	mode,
	id,
	fieldData,
}: {
	config: AdminConfig;
	mode: "add" | "edit";
	fieldData?: IGenre[] | IAuthor[] | IPublisher[] | ILanguage[];
	id?: string;
}) => {
	const { onSubmit, openDialog, handleEdit, dataById, form, differences } =
		useAdminForm(config, mode, id);

	// React Hook Form
	const {
		register,
		handleSubmit,
		watch,
		control,
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
		if (dataById) {
			console.log("dataById", dataById);
		}
	}, [dataById]);

	if (openDialog) {
		return (
			<ConfirmAction
				title={`Are you confirm to change the ${dataById.title} info?`}
				openDialog={openDialog}
				onConfirm={handleEdit}
				onCancel={() => handleEdit(false)}>
				<ChangedInfo differences={differences} />
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
				{config.fields.map((field) => {
					if (field.type === "autoComplete") {
						return (
						<Grid size={12}>
								<AutoCompleteField
								name={field.name}
								control={control}
								rules={field.rules}
								options={fieldData[field.name]?.data || []}
								placeholder={field.placeholder}
								value={fieldData[field.name]?.data || ""}
								label={field.label}
							/>
						</Grid>
						);
					}
					if (field.type === "selectCheckboxes") {
						return (
							<Grid size={12}>
								<SelectCheckboxes
									dataList={fieldData[field.name]?.data || []}
									control={control}
									name={field.name}
									label={field.label}
								/>
							</Grid>
						);
					}
					return (
						<Grid size={12}>
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
					);
				})}
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
