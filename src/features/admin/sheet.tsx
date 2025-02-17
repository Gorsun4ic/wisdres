import { ErrorBoundary } from "react-error-boundary";
import { Stack, Alert } from "@mui/material";

import { useAdminSheet } from "@hooks/useAdminSheet";

import GridData from "./grid";
import FormBuilder from "./form-builder/formBuilder";

import Modal from "@components/modal";
import Button from "@components/button";
import ErrorMessage from "@components/error";

import { AdminConfig } from "@custom-types/adminFormConfig";

import upperCaseFirstLetter from "@utils/upperCaseFirstLetter";

interface BaseSheetProps<T> {
	config: AdminConfig;
}

const Sheet = ({
	config
}: BaseSheetProps<T>) =>{
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
				<Button size="small" onClick={() => handleOpen("add")}>
					Add new {config.entityName.toLowerCase()}
				</Button>
			</Stack>

			<ErrorBoundary fallback={<ErrorMessage />}>
				{config.fields && (
					<Modal open={open} onClose={handleClose}>
						<FormBuilder config={config} mode={formMode} id={toEditId} />
					</Modal>
				)}

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

			{alert?.place === "sheet" && (
				<Alert severity={alert.color}>{alert.title}</Alert>
			)}
		</>
	);
}

export default Sheet;
