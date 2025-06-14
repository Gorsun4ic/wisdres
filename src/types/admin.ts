import { IUser } from "./roles"
import {
	ApiSuccess,
	ApiError,
} from "./apiResponse";


export type IAdminUser = IUser & {
	role: ["ADMIN"]
} 

// Get admins
export type GetAdminsAnswer = ApiSuccess<IAdminUser[]> | ApiError;

// Get admin
export type GetAdminAnswer = ApiSuccess<IAdminUser> | ApiError;

// Promote to admin
export type PromoteAdminAnswer = ApiSuccess<IAdminUser> | ApiError;

// Demote from admin
export type DemoteAdminAnswer = ApiSuccess<IUser> | ApiError;
