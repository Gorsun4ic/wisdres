export type AlertColors = "success" | "info" | "warning" | "error";

export interface IAlert {
	title: string;
	color: AlertColors;
	place: "form" | "sheet";
}