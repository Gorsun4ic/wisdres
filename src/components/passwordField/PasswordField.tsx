import { useState } from "react";
import { useTheme } from "styled-components";

// RHF Type for register
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

// MUI Components
import { Tooltip, IconButton } from "@mui/material";

import { useTranslation } from "react-i18next";

// Icons
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Custom components
import {StyledField} from "./style";

interface PasswordFieldProps<T extends FieldValues> {
	register: UseFormRegister<T>;
	validation?: Record<string, unknown>;
	error?: string;
	name: Path<T>;
	placeholder?: string;
}


const PasswordField = <T extends FieldValues> ({ register, error, validation, name, placeholder }: PasswordFieldProps<T>) => {
	const [showPassword, setShowPassword] = useState(false);
	const { t } = useTranslation();
	const theme = useTheme();

	return (
		<>
			<StyledField
				type={showPassword ? "text" : "password"}
				placeholder={placeholder || t("password")}
				{...register(name, {
					...validation,
					pattern: {
						value:
							/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
						message: t("passwordValidationMessage"),
					},
				})}
				error={!!error}
				helperText={error}
				slotProps={{
					input: {
						startAdornment: <LockIcon sx={{ color: theme.colors.green }} />,
						endAdornment: (
							<Tooltip title={t("showPassword")}>
								<IconButton
									className={`show-password ${showPassword ? "active" : null}`}
									onClick={() => {
										setShowPassword(!showPassword);
									}}>
									{showPassword ? <VisibilityOff /> : <VisibilityIcon />}
								</IconButton>
							</Tooltip>
						),
					},
				}}
			/>
		</>
	);
};

export default PasswordField;
