import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAddAdminMutation } from "../../../store/api/userApi";
import { UserRoles } from "../../../types/roles";

interface AddAdminDialogProps {
	open: boolean;
	onClose: () => void;
}

interface FormData {
	email: string;
	name: string;
	password: string;
}

export function AddAdminDialog({ open, onClose }: AddAdminDialogProps) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>();
	const [addAdmin] = useAddAdminMutation();

	const onSubmit = async (data: FormData) => {
		await addAdmin({
			...data,
			role: UserRoles.ADMIN,
		});
		reset();
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Add New Admin</DialogTitle>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogContent>
					<TextField
						fullWidth
						margin="dense"
						label="Email"
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "Invalid email address",
							},
						})}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>
					<TextField
						fullWidth
						margin="dense"
						label="Name"
						{...register("name", { required: "Name is required" })}
						error={!!errors.name}
						helperText={errors.name?.message}
					/>
					<TextField
						fullWidth
						margin="dense"
						label="Password"
						type="password"
						{...register("password", {
							required: "Password is required",
							minLength: {
								value: 8,
								message: "Password must be at least 8 characters",
							},
						})}
						error={!!errors.password}
						helperText={errors.password?.message}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Cancel</Button>
					<Button type="submit" variant="contained">
						Add Admin
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
