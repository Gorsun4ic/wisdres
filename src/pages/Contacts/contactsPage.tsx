import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";


const ContactsPage = () => {

	const { t } = useTranslation();

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
			<h3>{t("email")}</h3>
			<a href="mailto:support@wisdres.com">support@wisdres.com</a>
		</Box>
	);
};

export default ContactsPage;