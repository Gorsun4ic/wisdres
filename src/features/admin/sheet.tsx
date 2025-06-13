import { useTranslation } from "react-i18next";

import { ErrorBoundary } from "react-error-boundary";
import { Stack, Alert } from "@mui/material";

import { useAdminSheet } from "@hooks/useAdminSheet";

import GridData from "./grid";
import FormBuilder from "./form-builder/formBuilder";

import Modal from "@components/modal";
import Button from "@components/button";
import ErrorMessage from "@components/error";
import InputFileUpload from "@components/uploadFile/uploadFile";

import { AdminConfig } from "@custom-types/adminFormConfig";
import File from "@custom-types/file";


import upperCaseFirstLetter from "@utils/upperCaseFirstLetter";
import readJSON from "@utils/readJSONfile";

interface BaseSheetProps<T> {
	config: AdminConfig;
	fieldData?: T[];
}


const Sheet = ({ config, fieldData }: BaseSheetProps<T>) => {
	const {
		open,
		data,
		isLoading,
		error,
		formMode,
		toEditId,
		alert,
		handleOpen,
		handleClose,
		handleDelete,
	} = useAdminSheet(config);

	const { i18n } = useTranslation();
	const [addManyMutation, { isLoading: isAdding, error: addError }] =
		config.mutations.addMany();
	const onFileAttachment = async (file) => {
		const data = await readJSON(file);
		addManyMutation(data);
		console.log(data);
	}

	return (
		<>
			<Stack direction="row" gap={4} className="admin-panel__bar">
				<Stack
					gap={1}
					direction="row"
					sx={{ alignItems: "center" }}
					className="active-tab-section">
					{config.icon}
					<p>{upperCaseFirstLetter(config.entityName)}</p>
				</Stack>
				<Button size="small" onClick={() => handleOpen("add")}>
					Add new {config.entityName.toLowerCase()}
				</Button>
				<InputFileUpload onAttachment={onFileAttachment}/>
			</Stack>

			<ErrorBoundary fallback={<ErrorMessage />}>
				{config.fields && (
					<Modal open={open} onClose={handleClose}>
						<FormBuilder
							config={config}
							mode={formMode}
							id={toEditId}
							fieldData={fieldData}
						/>
					</Modal>
				)}
			</ErrorBoundary>

			<ErrorBoundary fallback={<ErrorMessage />}>
				<GridData
					handleEdit={handleOpen}
					data={data}
					isLoading={isLoading}
					error={error}
					onDelete={handleDelete}
					columns={config.columns}
					deleteButton={config.deleteButton || true}
					changeButton={config.changeButton || true}
				/>
			</ErrorBoundary>

			<ErrorBoundary fallback={<ErrorMessage />}>
				{alert?.place === "sheet" && (
					<Alert severity={alert.color}>{alert.title}</Alert>
				)}
			</ErrorBoundary>
		</>
	);
};

export default Sheet;
