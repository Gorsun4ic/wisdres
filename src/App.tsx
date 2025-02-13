import { ROLES } from "@server/models/user";
import ProtectedRoute from "@components/admin-route/adminRoute";

function App() {
	return (
		<Routes>
			{/* Public routes */}
			<Route path="/" element={<Home />} />

			{/* Protected admin routes */}
			<Route
				path="/admin/*"
				element={
					<ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
						<AdminPage />
					</ProtectedRoute>
				}
			/>

			{/* Protected moderator routes */}
			<Route
				path="/moderator/*"
				element={
					<ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.MODERATOR]}>
						<ModeratorPage />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}
