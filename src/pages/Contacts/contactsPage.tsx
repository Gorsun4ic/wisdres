import { Box } from "@mui/material";

const ContactsPage = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "80vh",
				a: {
					color: "green",
				},
			}}>
			<h3>Email</h3>
			<a href="mailto:support@wisdres.com">support@wisdres.com</a>
		</Box>
	);
};

export default ContactsPage;