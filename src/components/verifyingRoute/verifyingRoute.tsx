// Component for user who is verifying their account

// Redux
import { useSelector } from "react-redux";

// React Router DOM
import { Navigate, Outlet } from "react-router-dom";

// Store type
import { RootState } from "@store/index";

const VerifyingRoute = () => {
	const { isVerifying } = useSelector((state: RootState) => state.auth);

	if (!isVerifying) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default VerifyingRoute;
