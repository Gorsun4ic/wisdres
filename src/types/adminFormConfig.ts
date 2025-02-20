import { fetchBaseQuery  } from "@reduxjs/toolkit/query";
import { GridColDef } from "@mui/x-data-grid";

interface Validation {
	required?: string;
	minLength?: number | {
		value: number,
		message: string
	};
	maxLength?: number | {
		value: number,
		message: string
	};
	validate?: (value: string) => boolean | string;
}

export interface FormFieldConfig {
  name: string;
	label?: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'image' | 'number';
  validation?: Validation;
	rules?: Validation;
  rows?: number; // for textarea
}

interface SelectCheckboxesConfig {
	name: string;
	label: string;
	type: "selectCheckboxes";
}

interface AutoCompleteConfig {
	name: string;
	label: string;
	type: "autoComplete";
	multiple?: boolean;
	rules: Validation;
}


export interface AdminConfig {
	entityName: string; // 'publisher', 'author', 'book'
	fields?: (FormFieldConfig | SelectCheckboxesConfig | AutoCompleteConfig)[];
	icon: React.ReactNode;
	columns: GridColDef[];
	deleteButton?: boolean;
	changeButton?: boolean;
	successChangeUserStatus?: string;
	failChangeUserStatus?: string;
	mutations: {
		add?: typeof fetchBaseQuery; // RTK Query mutation
		update?: typeof fetchBaseQuery; // RTK Query mutation
		getById?: typeof fetchBaseQuery; // RTK Query query
		delete?: typeof fetchBaseQuery; // RTK Query mutation
		getAll: typeof fetchBaseQuery; // RTK Query query
		changeUserStatus?: typeof fetchBaseQuery; // RTK Query mutation
	};
}
