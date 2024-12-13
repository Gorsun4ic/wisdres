import { StyledError } from "./style";

const ErrorMessage = () => {
	return (
		<StyledError>
			<img src="https://shorturl.at/rWg24" alt="Something went wrong" width="300" height="250"/>
			<p>Ooops... Something went wrong :(</p>
		</StyledError>
	);
};

export default ErrorMessage;