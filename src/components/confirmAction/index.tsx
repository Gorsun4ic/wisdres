import { ReactNode } from "react";

import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent  from "@mui/material/DialogContent";

import { StyledDialog } from "./style";

const ConfirmAction = ({
	title,
	openDialog,
	onConfirm,
	onCancel,
	children
}: {
	title: string;
	openDialog: boolean;
	onConfirm: (arg0: boolean) => void;
	onCancel: (arg0: boolean) => void;
	children?: ReactNode
}) => (
	<StyledDialog
		open={openDialog}
		onClose={onCancel}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description">
		<DialogTitle id="alert-dialog-title">
			{title}
		</DialogTitle>
		{children && 
		<DialogContent>
			{children}
		</DialogContent>}
		<DialogActions>
			<Button onClick={() => onConfirm(true)} color="error">
				Yes
			</Button>
			<Button onClick={() => onConfirm(false)} autoFocus>
				No
			</Button>
		</DialogActions>
	</StyledDialog>
);

export default ConfirmAction;
