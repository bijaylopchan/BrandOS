import { useEffect, useState } from "react";

import {
    UserRound,
    Mail,
    LockKeyhole,
    Save,
    CalendarDays
} from "lucide-react";

import api from "../services/api";


function Account() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [createdAt, setCreatedAt] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    useEffect(() => {

        fetchAccount();

    }, []);


    const fetchAccount = async () => {

        try {

            setLoading(true);

            const response = await api.get(
                "/auth/me"
            );


            setName(response.data.name);
            setEmail(response.data.email);
            setCreatedAt(response.data.createdAt);


        } catch (error) {

            console.log(error);

            setError(
                "Unable to load account information."
            );


        } finally {

            setLoading(false);

        }

    };


    const handleSave = async (e) => {

        e.preventDefault();


        try {

            setSaving(true);
            setMessage("");
            setError("");


            const response = await api.put(
                "/auth/account",
                {
                    name,
                    password
                }
            );


            setName(response.data.user.name);

            setPassword("");

            setMessage(
                "Account updated successfully."
            );


        } catch (error) {

            console.log(error.response?.data);

            setError(
                error.response?.data?.message ||
                "Unable to update account."
            );


        } finally {

            setSaving(false);

        }

    };


    if (loading) {

        return (

            <div className="mx-auto max-w-3xl">

                <p className="text-gray-600">
                    Loading account...
                </p>

            </div>

        );

    }


    return (

        <div className="mx-auto max-w-3xl">

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-gray-900">
                    My Account
                </h1>

                <p className="mt-2 text-gray-600">
                    Manage your personal BrandOS account details.
                </p>

            </div>


            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">


                {/* Account Header */}

                <div className="mb-8 flex items-center gap-5">

                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-3xl font-bold text-white shadow-md">

                        {
                            name
                                ? name.charAt(0).toUpperCase()
                                : "U"
                        }

                    </div>


                    <div className="min-w-0">

                        <h2 className="truncate text-2xl font-bold text-gray-900">
                            {name}
                        </h2>

                        <p className="truncate text-gray-500">
                            {email}
                        </p>

                        {
                            createdAt && (

                                <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">

                                    <CalendarDays size={15} />

                                    <span>
                                        Member since{" "}
                                        {
                                            new Date(
                                                createdAt
                                            ).toLocaleDateString()
                                        }
                                    </span>

                                </div>

                            )
                        }

                    </div>

                </div>


                <form
                    onSubmit={handleSave}
                    className="space-y-6"
                >


                    {/* Name */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Name
                        </label>

                        <div className="relative">

                            <UserRound
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                required
                                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                    </div>


                    {/* Email */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Email
                        </label>

                        <div className="relative">

                            <Mail
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="email"
                                value={email}
                                readOnly
                                className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 py-3 pl-11 pr-4 text-gray-500"
                            />

                        </div>

                        <p className="mt-2 text-xs text-gray-400">
                            Email changes are not available in this version.
                        </p>

                    </div>


                    {/* Password */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            New Password
                        </label>

                        <div className="relative">

                            <LockKeyhole
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Leave blank to keep current password"
                                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                    </div>


                    {/* Error */}

                    {
                        error && (

                            <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
                                {error}
                            </div>

                        )
                    }


                    {/* Success */}

                    {
                        message && (

                            <div className="rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700">
                                {message}
                            </div>

                        )
                    }


                    {/* Save */}

                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        <Save size={18} />

                        {
                            saving
                                ? "Saving..."
                                : "Save Changes"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}


export default Account;