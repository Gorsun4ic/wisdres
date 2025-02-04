import { useLogoutUserMutation } from "@api/apiUsersSlice";
import { useEffect } from "react";

const UserLogout = () => {
	const [logout] = useLogoutUserMutation();

	useEffect(() => {
		logout()
	}, [logout])

	return (
		<div>
			<h1>You successfully logged out from your account!</h1>
			<p>To ensure it, here is your token: {localStorage.getItem("token")}</p>
		</div>
	)

};

export default UserLogout;