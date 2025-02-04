// Component to redirect not authenticated users

// Redux
import { useSelector } from "react-redux";

// React Router DOM
import { Navigate, Outlet } from "react-router-dom";

// Store type
import { RootState } from "@store/index";

const NotAuthenticateRoute = () => {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);

	if (isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default NotAuthenticateRoute;
