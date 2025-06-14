// Generic API success response
export interface ApiSuccess<T = undefined> {
	success: true;
	message: string;
	data?: T;
}

// Generic API error response
export interface ApiError {
	success: false;
	error: {
		field?: string;
		message: string;
		code: string | number;
	};
}

export interface ApiFieldError extends ApiError {
	error: {
		message: string;
		field: string;
		code: string | number;
	}
}

export type ApiDefaultAnswer = ApiSuccess | ApiError;