import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
    Sparkles,
    LayoutDashboard,
    LogIn,
    LogOut,
    Menu,
    X
} from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
    const { token, logout } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        closeMenu();
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur-md sm:px-6">
            <div className="mx-auto flex max-w-7xl items-center justify-between">

                {/* Brand Logo */}
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
                            Brand<span className="text-blue-600">OS</span>
                        </p>

                        <p className="text-[8px] uppercase tracking-[0.22em] text-gray-400 sm:text-[9px]">
                            Build. Manage. Grow.
                        </p>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-2 md:flex">
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

                    {token ? (
                        <>
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

                            <button
                                onClick={logout}
                                className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-red-600 transition hover:bg-red-50"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-gray-600 transition hover:bg-gray-100 hover:text-blue-600"
                            >
                                <LogIn size={18} />
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button - only when logged out */}
                {!token && (
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
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

            {/* Mobile Navigation - logged out only */}
            {menuOpen && !token && (
                <div className="mt-4 border-t border-gray-200 pt-4 md:hidden">
                    <div className="flex flex-col gap-2">

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

                        <Link
                            to="/login"
                            onClick={closeMenu}
                            className="flex items-center gap-2 rounded-lg px-4 py-3 font-medium text-gray-600 transition hover:bg-gray-100 hover:text-blue-600"
                        >
                            <LogIn size={18} />
                            Login
                        </Link>

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