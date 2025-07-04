import { Button as MUIButton, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const Button = styled(MUIButton)<ButtonProps>(({ theme }) => ({
	color: theme.palette.success.contrastText,
	backgroundColor: theme.palette.primary.main,
}));

export default Button;