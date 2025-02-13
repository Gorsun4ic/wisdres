import AdminRoute from "../components/admin-route/adminRoute";
import { UserRoles } from "../types/roles";

// In your routes configuration
<Route element={<AdminRoute allowedRoles={["admin", "super_admin"]} />}>
	<Route path="/admin" element={<AdminPanel />} />
	<Route path="/admin/*" element={<AdminRoutes />} />
	{/* other admin routes */}
</Route>;
