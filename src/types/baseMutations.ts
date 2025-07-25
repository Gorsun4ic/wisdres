import { FieldValues } from "react-hook-form";
import { ApiSuccess } from "./apiResponse";

// base‑mutations.ts
export type AddMutation<D> = readonly [
	(d: D) => Promise<{ data?: unknown; error?: unknown }>,
	{ isLoading: boolean; error?: unknown }
];
export type UpdateMutation<D> = readonly [
	(args: {
		id: string;
		updates: D;
	}) => Promise<{ data?: unknown; error?: unknown }>,
	{ isLoading: boolean; error?: unknown }
];

export type GetByIdMutation<D> = readonly [
	(id: string) => Promise<{ data?: unknown; error?: unknown }>,
	{ data?: ApiSuccess<D>; isLoading: boolean; error?: unknown },
	unknown
];

export type BaseFormMutations<T extends FieldValues= FieldValues> = {
	add: () => AddMutation<T>;
	update: () => UpdateMutation<T>;
	getById: () => GetByIdMutation<T>;
};

export type SheetMutations<T extends FieldValues> = BaseFormMutations<T> & {
	getAll: () => { data?: ApiSuccess<T[]>; isLoading: boolean; error?: unknown };
	delete: () => readonly [
		(id: string) => Promise<{ data?: unknown; error?: unknown }>,
		unknown
	];
};
