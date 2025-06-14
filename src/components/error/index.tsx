import { useTranslation } from "react-i18next";

import { StyledError } from "./style";

const ErrorMessage = ({children}: {children?: string}) => {

  const { t } = useTranslation();

	return (
		<StyledError>
			<img
				src="https://shorturl.at/rWg24"
				alt="Something went wrong"
				width="300"
				height="250"
			/>
			<p>{children ? children : t("error")}</p>
		</StyledError>
	);
};

export default ErrorMessage;
