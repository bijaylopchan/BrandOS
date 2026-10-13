
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// =========================================================
// PROTECTED ROUTE
// =========================================================

function ProtectedRoute({ children }) {

    const {
        isAuthenticated,
        loading
    } = useAuth();

    // =====================================================
    // WAIT FOR AUTHENTICATION VERIFICATION
    // =====================================================

    if (loading) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">

                <div className="flex flex-col items-center gap-4">

                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

                    <p className="text-sm font-medium text-gray-600">
                        Verifying your session...
                    </p>

                </div>

            </div>
        );

    }

    // =====================================================
    // REDIRECT UNAUTHENTICATED USERS
    // =====================================================

    if (!isAuthenticated) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }

    // =====================================================
    // ALLOW AUTHENTICATED USERS
    // =====================================================

    return children;

}

export default ProtectedRoute;
