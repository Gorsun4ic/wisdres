import { useEffect } from "react";

import { useCheckAuthQuery } from "@api/apiUsersSlice";

const UserProfile = () => {
	const {data} = useCheckAuthQuery(null);

	useEffect(() => {
		if (data) {
			console.log("Here is user's data", data);
		}
	}, [data]);

	return (
		<div>
			<h1>Welcome, {data?.user?.username}</h1>
		</div>
	)
};

export default UserProfile;