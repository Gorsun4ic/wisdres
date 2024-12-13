import { IAlert } from "@custom-types/alert";

export const showAlert = (alert: IAlert) => {
	return {
		type: "SHOW_ALERT",
		payload: alert,
	};
};

export const hideAlert = () => {
	return { type: "HIDE_ALERT" };
};
