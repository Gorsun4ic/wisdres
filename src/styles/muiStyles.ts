import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
	palette: {
		primary: {
			light: "#757ce8",
			main: "#5EB168",
			dark: "#519a5a",
			contrastText: "#fff",
		},
		secondary: {
			light: "#ff7961",
			main: "#f44336",
			dark: "#ba000d",
			contrastText: "#000",
		},
	},
});
