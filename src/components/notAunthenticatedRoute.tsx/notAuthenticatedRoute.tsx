// Component to redirect not authenticated users
import { Navigate, Outlet } from "react-router-dom";
import { useCheckAuthQuery } from "@api/apiUsersSlice";


const NotAuthenticateRoute = () => {
	const { data, error, isLoading } = useCheckAuthQuery();


	if (data?.success) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default NotAuthenticateRoute;
