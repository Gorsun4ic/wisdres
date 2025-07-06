import { ErrorBoundary } from "react-error-boundary";
import { Stack, Alert } from "@mui/material";

import { FieldValues } from "react-hook-form";


import { useAdminSheet } from "@hooks/useAdminSheet";

import GridData, { Entity } from "./grid";
import FormBuilder from "./form-builder/formBuilder";

import Modal from "@components/modal";
import Button from "@components/button/button";
import ErrorMessage from "@components/error";

import { AdminConfig } from "@custom-types/adminFormConfig";
import { AlertColors } from "@custom-types/alert";
import { SheetMutations, BaseFormMutations } from "@custom-types/baseMutations";

import upperCaseFirstLetter from "@utils/upperCaseFirstLetter";
interface SheetProps<
	TData extends FieldValues,
	TMutations extends SheetMutations<TData>,
	TFieldData extends Record<string,{ data: { title: string; _id: string }[] }> | undefined = undefined

> {
	config: AdminConfig<TMutations>;
	fieldData?: TFieldData;
}

const Sheet = <
	TData extends FieldValues,
	TMutations extends SheetMutations<TData>,
	TFieldData extends Record<string,{ data: { title: string; _id: string }[] }> | undefined = undefined
>({
	config,
	fieldData,
}: SheetProps<TData, TMutations, TFieldData>) => {
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
	} = useAdminSheet<TData, TMutations>(config);

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
				<Button onClick={() => handleOpen("add")}>
					Add new {config.entityName.toLowerCase()}
				</Button>
			</Stack>

			<ErrorBoundary fallback={<ErrorMessage />}>
				{config.fields && (
					<Modal open={open} onClose={handleClose}>
						<FormBuilder
							config={config as AdminConfig<BaseFormMutations<FieldValues>>}
							mode={formMode}
							id={toEditId ?? ""}
							fieldData={fieldData}
						/>
					</Modal>
				)}
			</ErrorBoundary>

			<ErrorBoundary fallback={<ErrorMessage />}>
				<GridData
					handleEdit={handleOpen}
					data={data as unknown as Entity[]}
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
					<Alert severity={alert.color as AlertColors}>{alert.title}</Alert>
				)}
			</ErrorBoundary>
		</>
	);
};

export default Sheet;
