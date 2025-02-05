// Component for user who is verifying their account

// React Router DOM
import { Navigate, Outlet } from "react-router-dom";

const VerifyingRoute = () => {
	const isVerifying = localStorage.getItem("isVerifying") === "true";

	if (!isVerifying) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default VerifyingRoute;
