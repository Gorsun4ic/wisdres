// React
import { useEffect, useState } from "react";

// React Router DOM
import { useNavigate, Outlet } from "react-router-dom";

// MUI
import { CircularProgress } from "@mui/material";

// API
import { useCheckAuthQuery } from "@api/apiUsersSlice";

// Utils
import hasPermission from "@utils/hasPermission";

const AdminRoute = () => {
	const { data: userData, isLoading } = useCheckAuthQuery(null);
	const [accessChecked, setAccessChecked] = useState(false);
	const [hasAdminAccess, setHasAdminAccess] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading && userData?.user) {
			const hasAccess = hasPermission(userData.user, "view:admin_panel");
			setHasAdminAccess(hasAccess);
			setAccessChecked(true);

			if (!hasAccess) {
				navigate("/");
			}
		} else if (!isLoading && !userData?.user) {
			navigate("/");
		}
	}, [userData, isLoading, navigate]);

	if (isLoading || !accessChecked) {
		return <CircularProgress sx={{ display: "block", margin: "20px auto" }} />;
	}

	return hasAdminAccess ? <Outlet /> : null;
};

export default AdminRoute;
