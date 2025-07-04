import { ErrorBoundary } from "react-error-boundary";
import { Stack, Alert } from "@mui/material";

import { useAdminSheet } from "@hooks/useAdminSheet";

import GridData from "./grid";
import FormBuilder from "./form-builder/formBuilder";

import Modal from "@components/modal";
import Button from "@components/button/Button";
import ErrorMessage from "@components/error";
import { AdminConfig, AllMutationTypes } from "@custom-types/adminFormConfig";

import upperCaseFirstLetter from "@utils/upperCaseFirstLetter";

interface BaseSheetProps<T> {
	config: AdminConfig<T>;
	fieldData?: T[];
}

const Sheet = <T extends AllMutationTypes>({
	config,
	fieldData,
}: BaseSheetProps<T>) => {
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
				<Button
					onClick={() => handleOpen("add")}>
					Add new {config.entityName.toLowerCase()}
				</Button>
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
					data={data?.data ?? []}
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
