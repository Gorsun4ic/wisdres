// Component to redirect authenticated users

// React Router DOM
import { Navigate, Outlet } from "react-router-dom";

const AuthenticateRoute = () => {
	const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

	if (!isAuthenticated) {
		return <Navigate to="/sign-in" replace />;
	}

	return <Outlet />;
};

export default AuthenticateRoute;
