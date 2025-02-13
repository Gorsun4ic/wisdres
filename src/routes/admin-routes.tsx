import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "../components/layouts/admin-layout";
import { AdminManagement } from "../components/admin/admin-management";
import { useAuth } from "../hooks/useAuth";
import { UserRoles } from "../types/roles";
import { AdminBooksPage } from "../features/admin/books";

export function AdminRoutes() {
	console.log("AdminRoutes render"); // Debug log

	const { isSuperAdmin } = useAuth();

	return (
		<AdminLayout>
			<Routes>
				<Route path="/" element={<Navigate to="books" replace />} />
				<Route path="books" element={<AdminBooksPage />} />
				<Route path="/users/*" element={<UserManagement />} />
				{isSuperAdmin() && (
					<Route path="/admins" element={<AdminManagement />} />
				)}
			</Routes>
		</AdminLayout>
	);
}
