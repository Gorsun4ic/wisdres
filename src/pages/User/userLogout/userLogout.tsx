import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useLogoutUserMutation } from "@api/apiUsersSlice";

const UserLogout = () => {
	const { t } = useTranslation();
	const [logout] = useLogoutUserMutation();

	useEffect(() => {
		logout(null);
		localStorage.setItem("isAuthenticated", "false");
	}, [logout]);

	return (
		<div>
			<h1>{t("logOutSuccess")}</h1>
		</div>
	);
};

export default UserLogout;
