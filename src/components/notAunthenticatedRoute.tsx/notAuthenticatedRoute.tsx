// Component to redirect not authenticated users
import { Navigate, Outlet } from "react-router-dom";

const NotAuthenticateRoute = () => {
	const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

	if (isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default NotAuthenticateRoute;
