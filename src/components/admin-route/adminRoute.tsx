// React
import { useEffect, useState } from "react";

// React Router DOM
import { useNavigate, Outlet } from "react-router-dom";

// MUI
import { CircularProgress } from "@mui/material";

// API
import { useCheckAuthQuery } from "@api/apiUsersSlice";

// Types
import { IUser } from "@custom-types/roles";

// Utils
import hasPermission from "@utils/hasPermission";

const AdminRoute = () => {
	const { data, isLoading, error } = useCheckAuthQuery();
	const [accessChecked, setAccessChecked] = useState(false);
	const [hasAdminAccess, setHasAdminAccess] = useState(false);
	const navigate = useNavigate();

	const userData: IUser | null =  data?.success && data.data ? data.data : null;

	const checkingUserPermission = (user: IUser) => {
		const hasAccess = hasPermission(user, "view:admin_panel");
		setHasAdminAccess(hasAccess);
		setAccessChecked(true);

		if (!hasAccess) {
			navigate("/");
		}
	}

	useEffect(() => {
		if (!isLoading && !userData || error) {
			navigate("/");
		}

		if (userData) {
			checkingUserPermission(userData);
		}
	}, [userData, isLoading, navigate]);



	if (isLoading || !accessChecked) {
		return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
	}

	return hasAdminAccess ? <Outlet /> : null;
};

export default AdminRoute;
