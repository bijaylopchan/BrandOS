import { NavLink, useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    Sparkles,
    Clock3,
    Building2,
    BarChart3,
    Settings,
    LogOut,
    Crown
} from "lucide-react";


function DashboardLayout({ children }) {

    const navigate = useNavigate();


    const navItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard
        },
        {
            name: "AI Generator",
            path: "/generator",
            icon: Sparkles
        },
        {
            name: "History",
            path: "/history",
            icon: Clock3
        },
        {
            name: "Business Profile",
            path: "/business-profile",
            icon: Building2
        },
        {
            name: "Analytics",
            path: "/analytics",
            icon: BarChart3
        },
        {
            name: "Settings",
            path: "/settings",
            icon: Settings
        }
    ];


    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };


    return (

        <div className="flex min-h-screen bg-slate-50">

            <aside className="flex w-72 flex-col border-r border-gray-200 bg-white p-6">

                <div className="mb-10 flex items-center gap-3">

                    <div className="rounded-xl bg-blue-600 p-2 text-white">
                        <Sparkles size={22} />
                    </div>

                    <h2 className="text-xl font-bold text-gray-900">
                        BrandOS
                    </h2>

                </div>


                <nav className="flex flex-1 flex-col gap-2">

                    {
                        navItems.map((item) => {

                            const Icon = item.icon;

                            return (

                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                                            isActive
                                                ? "border border-blue-200 bg-blue-50 text-blue-700"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                        }`
                                    }
                                >

                                    <Icon size={19} />

                                    {item.name}

                                </NavLink>

                            );

                        })
                    }

                </nav>


                <div className="mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-5 text-white shadow-lg">

                    <div className="mb-3 flex items-center gap-2">

                        <Crown size={20} />

                        <h3 className="font-bold">
                            Upgrade to Pro
                        </h3>

                    </div>

                    <p className="text-sm text-blue-100">
                        Unlock advanced analytics, unlimited generations and more.
                    </p>

                    <button
                        onClick={() => navigate("/pricing")}
                        className="mt-5 w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-gray-100"
                    >
                        View Plans
                    </button>

                </div>


                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >

                    <LogOut size={19} />

                    Logout

                </button>

            </aside>


            <main className="min-w-0 flex-1 p-8 lg:p-10">

                {children}

            </main>

        </div>

    );

}


export default DashboardLayout;