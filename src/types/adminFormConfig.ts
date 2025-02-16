import { fetchBaseQuery } from "@reduxjs/toolkit/query";

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

export interface AdminFormConfig {
	entityName: string; // 'publisher', 'author', 'book'
	fields: FormFieldConfig[];
	mutations: {
		add: typeof fetchBaseQuery; // RTK Query mutation
		update: typeof fetchBaseQuery; // RTK Query mutation
		getById: typeof fetchBaseQuery; // RTK Query query
	};
}
