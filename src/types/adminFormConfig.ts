import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { GridColDef } from "@mui/x-data-grid";

export interface FormFieldConfig {
  name: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'image';
  validation: {
    required?: string;
    minLength?: number;
    maxLength?: number;
    validate?: (value: string) => boolean | string;
  };
  rows?: number; // for textarea
}

export interface AdminConfig {
	entityName: string; // 'publisher', 'author', 'book'
	fields: FormFieldConfig[];
	icon: React.ReactNode;
	columns: GridColDef[];
	mutations: {
		add: typeof fetchBaseQuery; // RTK Query mutation
		update: typeof fetchBaseQuery; // RTK Query mutation
		getById: typeof fetchBaseQuery; // RTK Query query
		delete: typeof fetchBaseQuery; // RTK Query mutation
		getAll: typeof fetchBaseQuery; // RTK Query query
	};
}
