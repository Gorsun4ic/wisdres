import { Link } from "react-router-dom";

import Box from "@mui/material/Box";

const Page404 = () => {
	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			height: "80vh",
			"a": {
				color: "green",
			}
		}}>
			<h1>404</h1>
			<p>This page isn't available. Sorry about that. Try searching for something else.</p>
			<Link to="/">Go to home</Link>
		</Box>
	);
};

export default Page404;


