import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
    Sparkles,
    UserRound,
    LayoutDashboard,
    LogIn,
    Menu,
    X
} from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api";

function Navbar() {

    const { token, isAuthenticated, loading } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    // =====================================================
    // LOAD USER INFORMATION
    // =====================================================

    useEffect(() => {

        if (!isAuthenticated || !token) {
            setUser(null);
            return;
        }

        let cancelled = false;

        const loadUser = async () => {
            try {
                const response = await api.get("/auth/me");

                if (!cancelled) {
                    setUser(response.data);
                }

            } catch (error) {
                if (!cancelled) {
                    console.error(
                        "Failed to load navbar user:",
                        error
                    );
                    setUser(null);
                }
            }
        };

        loadUser();

        return () => {
            cancelled = true;
        };

    }, [token, isAuthenticated]);

    // =====================================================
    // CLOSE MOBILE MENU
    // =====================================================

    useEffect(() => {
        if (isAuthenticated) {
            setMenuOpen(false);
        }
    }, [isAuthenticated]);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const displayName =
        user?.name?.split(" ")[0] || "Profile";

    // =====================================================
    // NAVBAR
    // =====================================================

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-md sm:px-6">

            <div className="mx-auto flex max-w-7xl items-center justify-between">

                {/* BRAND LOGO */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="flex items-center gap-3"
                >

                    <div className="rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 p-2 text-white shadow-md">
                        <Sparkles size={22} />
                    </div>

                    <div>
                        <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                            Brand
                            <span className="text-blue-600">
                                OS
                            </span>
                        </p>

                        <p className="text-[8px] uppercase tracking-[0.22em] text-gray-400 sm:text-[9px]">
                            Build. Manage. Grow.
                        </p>
                    </div>

                </Link>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden items-center gap-2 md:flex">

                    {/* HOME */}
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `rounded-lg px-4 py-2 font-medium transition ${
                                isActive
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                            }`
                        }
                    >
                        Home
                    </NavLink>

                    {/* AUTHENTICATED / GUEST NAVIGATION */}
                    {!loading && (
                        isAuthenticated ? (

                            <>
                                {/* DASHBOARD */}
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition ${
                                            isActive
                                                ? "bg-blue-600 text-white shadow-md"
                                                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                        }`
                                    }
                                >
                                    <LayoutDashboard size={18} />
                                    Dashboard
                                </NavLink>

                                {/* USER PROFILE */}
                                <NavLink
                                    to="/account"
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 rounded-xl px-3 py-2 font-medium transition ${
                                            isActive
                                                ? "bg-violet-50 text-violet-700"
                                                : "text-gray-700 hover:bg-gray-100"
                                        }`
                                    }
                                >

                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-bold text-white shadow-sm">

                                        {user?.name ? (
                                            user.name
                                                .charAt(0)
                                                .toUpperCase()
                                        ) : (
                                            <UserRound size={17} />
                                        )}

                                    </div>

                                    <div className="text-left">

                                        <p className="text-sm font-semibold leading-tight">
                                            {displayName}
                                        </p>

                                        <p className="text-[11px] font-normal text-gray-400">
                                            Profile
                                        </p>

                                    </div>

                                </NavLink>
                            </>

                        ) : (

                            <>
                                {/* LOGIN */}
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-gray-600 transition hover:bg-gray-100 hover:text-blue-600"
                                >
                                    <LogIn size={18} />
                                    Login
                                </Link>

                                {/* REGISTER */}
                                <Link
                                    to="/register"
                                    className="rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                                >
                                    Get Started
                                </Link>
                            </>

                        )
                    )}

                </div>

                {/* MOBILE MENU BUTTON - LOGGED OUT ONLY */}
                {!loading && !isAuthenticated && (

                    <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={
                            menuOpen ? "Close menu" : "Open menu"
                        }
                        aria-expanded={menuOpen}
                        className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
                    >

                        {menuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}

                    </button>

                )}

            </div>

            {/* MOBILE NAVIGATION - LOGGED OUT ONLY */}
            {menuOpen && !loading && !isAuthenticated && (

                <div className="mt-4 border-t border-gray-200 pt-4 md:hidden">

                    <div className="flex flex-col gap-2">

                        {/* HOME */}
                        <NavLink
                            to="/"
                            onClick={closeMenu}
                            className={({ isActive }) =>
                                `rounded-lg px-4 py-3 font-medium transition ${
                                    isActive
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                                }`
                            }
                        >
                            Home
                        </NavLink>

                        {/* LOGIN */}
                        <Link
                            to="/login"
                            onClick={closeMenu}
                            className="flex items-center gap-2 rounded-lg px-4 py-3 font-medium text-gray-600 transition hover:bg-gray-100 hover:text-blue-600"
                        >
                            <LogIn size={18} />
                            Login
                        </Link>

                        {/* REGISTER */}
                        <Link
                            to="/register"
                            onClick={closeMenu}
                            className="rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-center font-semibold text-white shadow-md"
                        >
                            Get Started
                        </Link>

                    </div>

                </div>

            )}

        </nav>
    );
}

export default Navbar;
