import { GridColDef } from "@mui/x-data-grid";


import { BookMutations } from "@src/features/admin/books/books.config";
import { AuthorMutations } from "@src/features/admin/authors/author.config";
import { PublisherMutations } from "@src/features/admin/publishers/publisher.config";
import { LanguageMutations } from "@src/features/admin/languages/languages.config";
import { GenreMutations } from "@src/features/admin/genres/genre.config";
import { AdminMutations } from "@src/features/admin/admins/admins.config";
import { UserMutations } from "@src/features/admin/users/users.config";
interface Validation {
	required?: string;
	minLength?:
		| number
		| {
				value: number;
				message: string;
		  };
	maxLength?:
		| number
		| {
				value: number;
				message: string;
		  };
	validate?: (value: string) => boolean | string;
}

export interface FormFieldConfig {
	name: string;
	label?: string;
	placeholder: string;
	type: "text" | "textarea" | "image" | "number";
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

export type InferHook<
	Api extends { endpoints: Record<string, unknown> },
	Endpoint extends keyof Api["endpoints"],
	HookName extends string
> = Api["endpoints"][Endpoint] extends Record<HookName, infer Hook>
	? Hook
	: never;

type FieldTypes = FormFieldConfig | SelectCheckboxesConfig | AutoCompleteConfig;
type GroupedFields = [string, ...FieldTypes];

export type AllMutationTypes =
	| BookMutations
	| AuthorMutations
	| PublisherMutations
	| LanguageMutations
	| GenreMutations
	| AdminMutations
	| UserMutations;

export type ContentMutationTypes = 
	| BookMutations
	| AuthorMutations
	| PublisherMutations
	| LanguageMutations
	| GenreMutations;

export interface AdminConfig<T> {
	entityName: string; // 'publisher', 'author', 'book'
	fields?: (FieldTypes | GroupedFields)[];
	icon: React.ReactNode;
	columns: GridColDef[];
	deleteButton?: boolean;
	changeButton?: boolean;
	successChangeUserStatus?: string;
	failChangeUserStatus?: string;
	mutations: T;
}