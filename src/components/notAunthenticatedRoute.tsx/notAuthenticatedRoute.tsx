// Component to redirect not authenticated users
import { Navigate, Outlet } from "react-router-dom";
import { useCheckAuthQuery } from "@api/apiUsersSlice";


const NotAuthenticateRoute = () => {
	const { data} = useCheckAuthQuery();

	if (data?.success && data?.data?.emailVerified) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default NotAuthenticateRoute;
