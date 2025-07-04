// React
import { useCallback, useEffect, useState } from "react";

// React Router DOM
import { useNavigate, Outlet } from "react-router-dom";

// MUI
import { CircularProgress } from "@mui/material";

// API
import { useCheckAuthQuery } from "@api/apiUsersSlice";

// Types
import { IUser } from "@custom-types/user";

// Utils
import hasPermission from "@utils/hasPermission";

const AdminRoute = () => {
	const { data, isLoading, error } = useCheckAuthQuery();
	const [accessChecked, setAccessChecked] = useState(false);
	const [hasAdminAccess, setHasAdminAccess] = useState(false);
	const navigate = useNavigate();

	const userData: IUser | null = data?.success && data.data ? data.data : null;

	const checkingUserPermission = useCallback(
		(user: IUser) => {
			const hasAccess = hasPermission(user, "view:admin_panel");
			setHasAdminAccess(hasAccess);
			setAccessChecked(true);

			if (!hasAccess) {
				navigate("/");
			}
		},
		[navigate]
	);

	useEffect(() => {
		if ((!isLoading && !userData) || error) {
			navigate("/");
		}

		if (userData) {
			checkingUserPermission(userData);
		}
	}, [userData, isLoading, navigate, checkingUserPermission, error]);

	if (isLoading || !accessChecked) {
		return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
	}

	return hasAdminAccess ? <Outlet /> : null;
};

export default AdminRoute;
