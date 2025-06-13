import { useEffect } from "react";

// Redux
import { useSelector } from "react-redux";

// MUI
import Grid from "@mui/material/Grid2";
import { Alert } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
import { validateImageType } from "@utils/imgValidation";

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
	const {
		onSubmit,
		openDialog,
		handleEdit,
		dataById,
		form,
		differences,
		getFieldError,
	} = useAdminForm(config, mode, id);

	// React Hook Form
	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors },
	} = form;

	// Hook to track img input status
	const formValues = watch();

	// Alert state
	const { alert } = useSelector((state: RootState) => state.alert);

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
									multiple={field.multiple ?? true}
									error={getFieldError(errors, field.name)}
								/>
							</Grid>
						);
					}
					if (Array.isArray(field)) {
						const title = field[0];

						const fields = field.map((item, i) => {
							if (i === 0) return null;
							const value = watch(item.name);
							const isImageField = /img/i.test(item.name);
							const isValidImage = validateImageType(value);

							return (
								<AccordionDetails>
									<FormField
										name={item.name}
										type={item.type}
										placeholder={item.placeholder}
										validation={item.validation}
										register={register}
										rows={item.rows}
										multiline={item.rows ? true : false}
										error={getFieldError(errors, item.name)}
									/>

									{isImageField && isValidImage && (
										<img src={value} width="256" height="256" alt={item.name} />
									)}
								</AccordionDetails>
							);
						});
						return (
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1-content"
									id="panel1-header">
									<p>{title}</p>
								</AccordionSummary>
								{fields}
							</Accordion>
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
								error={getFieldError(errors, field.name)}
							/>
							{field.name.match(/.*img.*/) &&
								validateImageType(formValues[field.name]) && (
									<img
										src={formValues[field.name]}
										width="256"
										height="256"
										alt={field.name}
									/>
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
