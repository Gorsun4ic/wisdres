import { useState } from "react";

// RHF Type for register
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

// MUI Components
import { Tooltip, IconButton } from "@mui/material";

// Icons
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Custom components
import {StyledField} from "./style";

interface PasswordFieldProps<T extends FieldValues> {
	register: UseFormRegister<T>;
	validation?: Record<string, unknown>;
	error?: string;
	name: Path<T>;
}

const PasswordField = <T extends FieldValues> ({ register, error, validation, name }: PasswordFieldProps<T>) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<StyledField
			type={showPassword ? "string" : "password"}
			placeholder="Password"
			{...register(name, validation)}
			slotProps={{
				input: {
					startAdornment: <LockIcon />,
					endAdornment: (
						<Tooltip title="Show password">
							<IconButton
								className={`show-password ${showPassword ? "active" : null}`}>
								<VisibilityIcon
									onClick={() => {
										setShowPassword(!showPassword);
									}}
								/>
							</IconButton>
						</Tooltip>
					),
				},
			}}
			error={!!error}
		/>
	);
};

export default PasswordField;
