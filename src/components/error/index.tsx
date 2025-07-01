import { useTranslation } from "react-i18next";

import { StyledError } from "./style";

const ErrorMessage = ({children}: {children?: string}) => {

  const { t } = useTranslation();

	return (
		<StyledError>
			<img
				src="https://i.gifer.com/origin/78/787899e9d4e4491f797aba5c61294dfc_w200.gif"
				alt="Something went wrong"
				width="300"
				height="250"
			/>
			<p>{children ? children : t("error")}</p>
		</StyledError>
	);
};

export default ErrorMessage;
