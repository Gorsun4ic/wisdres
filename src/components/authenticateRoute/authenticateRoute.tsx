// Component to redirect authenticated users
import { useCheckAuthQuery } from "@api/apiUsersSlice";

// React Router DOM
import { Navigate, Outlet } from "react-router-dom";

const AuthenticateRoute = () => {
	const { data, error, isLoading } = useCheckAuthQuery();

	if (isLoading) return <div>Loading...</div>;

	if (error || !data?.success) {
		return <Navigate to="/sign-in" replace />;
	}

	return <Outlet />;
};

export default AuthenticateRoute;
