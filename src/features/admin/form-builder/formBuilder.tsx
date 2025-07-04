import { useTranslation } from "react-i18next";

// Redux
import { useSelector } from "react-redux";

// RHF
import { FieldValues } from "react-hook-form";

// MUI
import Grid from "@mui/material/Grid2";
import { Alert } from "@mui/material";
import { AutocompleteElement } from "react-hook-form-mui";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Store
import { RootState } from "@store/index";

// Custom types
import { AdminConfig, FieldTypes } from "@src/types/adminFormConfig";

// Custom hooks
import { useAdminForm } from "@hooks/useAdminForm";

// Custom components
import FormField from "@components/formField";
import Button from "@components/button";
import ConfirmAction from "@components/confirmAction";
import ChangedInfo from "@components/changedInfo/changedInfo";

// Utils
import { validateImageType } from "@utils/imgValidation";
import { getLangEntity } from "@src/utils/getLangEntity";

// Style
import { StyledForm } from "./style";
import { LangType } from "@src/i18n";

type AddMutation<Data> = [
	(data: Data) => void,
	{ isLoading: boolean; error?: unknown }
];
type UpdateMutation<Data> = [
	(args: { id?: string; updates: Data }) => void,
	{ isLoading: boolean; error?: unknown }
];
type GetByIdMutation<Data> = [
	(id: string) => void,
	{ data?: Data; isLoading: boolean; error?: unknown }
];

const FormBuilder = <
	TData extends FieldValues,
	TMutations extends {
		add: () => AddMutation<TData>;
		update: () => UpdateMutation<TData>;
		getById: () => GetByIdMutation<TData>;
	}
>({
	config,
	mode,
	id,
	fieldData,
}: {
	config: AdminConfig<TMutations>;
	mode: "add" | "edit";
	fieldData?: Record<string, { data: { title: string }[] }>;
	id?: string;
}) => {
	const { i18n } = useTranslation();
	const lang = i18n.language as LangType;

	const {
		onSubmit,
		openDialog,
		handleEdit,
		dataById,
		form,
		differences,
		getFieldError,
	} = useAdminForm<TData, TMutations>(config, mode, id);

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

	if (openDialog && dataById && differences) {
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

	if (!config) return null;

	return (
		<StyledForm onSubmit={handleSubmit(onSubmit)}>
			<h3 className="form-title">
				{mode === "add"
					? `Add ${config.entityName}`
					: `Edit ${config.entityName}`}
			</h3>

			{config.fields && (
				<Grid container spacing={2} sx={{ marginBottom: 2 }}>
					{config.fields.map((field) => {
						if (Array.isArray(field)) {
							const title = field[0];

							const fields = field.map((item, i) => {
								if (i === 0) return null;
								const value = watch(item.name);
								const isImageField = /img/i.test(item.name);
								const isValidImage = validateImageType(value);

								return (
									<AccordionDetails key={item.name}>
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
											<img
												src={value}
												width="256"
												height="256"
												alt={item.name}
											/>
										)}
									</AccordionDetails>
								);
							});
							return (
								<Accordion key={`accordion-${title}`}>
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
						if (field.type === "autoComplete" && fieldData) {
							const singleField = field as FieldTypes;
							const options = fieldData[field.name]?.data?.data?.map((item) => {
								return {
									label: getLangEntity(item.title, lang),
									id: item._id,
								};
							});

							if (singleField.type === "autoComplete") {
								return (
									<Grid size={12}>
										<p>{field.label}</p>
										<AutocompleteElement
											control={control}
											name={field.name}
											options={options || []}
											multiple={field.multiple ?? true}
										/>
									</Grid>
								);
							}
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
			)}
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
