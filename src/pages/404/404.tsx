import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import Box from "@mui/material/Box";

const Page404 = () => {
	const { t } = useTranslation();

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "80vh",
				a: {
					color: "green",
				},
			}}>
			<h1>404</h1>
			<p>{t("pageNotFound")}</p>
			<Link to="/">{t("goToHome")}</Link>
		</Box>
	);
};

export default Page404;


