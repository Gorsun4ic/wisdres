import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";

export const StyledMenuItem = styled(MenuItem)`
	&& {
		.MuiSelect-select,
		.MuiSelect-root, fieldset {
			border-color: red;
		}
	}
`;

export const StyledFormControl = styled(FormControl)`
	&& {
		.MuiSelect-select,
		.MuiSelect-root,
		fieldset,
		.Mui-focused {
			border-color: red;
		}
	}
`;

export const StyledSelect = styled(Select)`
	&& {
		.MuiSelect-select,
		.MuiSelect-root, fieldset {
			border-color: red;
		}
	}
`;
