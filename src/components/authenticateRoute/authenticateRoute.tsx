// Component to redirect authenticated users 

// Redux
import { useSelector } from "react-redux";

// React Router DOM
import {Navigate, Outlet} from "react-router-dom";

// Store type
import { RootState } from "@store/index";


const AuthenticateRoute = () => {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);

	if (!isAuthenticated) {
	 return	<Navigate to="/sign-in" replace />;
	}

	return <Outlet />;
};

export default AuthenticateRoute;