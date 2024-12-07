import { Box } from "@mui/material";
import { StyledModal } from "./style";

type ModalProps = {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

const Modal = ({ open, onClose, children }: ModalProps) => {
	return (
		<StyledModal
		className="modal"
			aria-labelledby="unstyled-modal-title"
			aria-describedby="unstyled-modal-description"
			open={open}
			onClose={onClose}>
			<Box className="modal__container">{children}</Box>
		</StyledModal>
	);
};

export default Modal;
