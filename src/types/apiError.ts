// Error type for backend's answer
export interface IError  {
	data: {
		success: boolean;
		error: {
			field: string;
			message: string;
		};
	};
};
