import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Bell,
    UserRound,
    CreditCard,
    LogOut,
    Trash2,
    ChevronRight,
    AlertTriangle,
    X,
    ShieldCheck
} from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api";


function Settings() {

    const navigate = useNavigate();

    const { logout } = useAuth();


    const [notifications, setNotifications] =
        useState(true);

    const [productUpdates, setProductUpdates] =
        useState(false);

    const [deleteModalOpen, setDeleteModalOpen] =
        useState(false);

    const [deleteConfirmation, setDeleteConfirmation] =
        useState("");

    const [deleting, setDeleting] =
        useState(false);

    const [errorMessage, setErrorMessage] =
        useState("");


    /* =========================================================
       LOAD SAVED PREFERENCES
    ========================================================= */

    useEffect(() => {

        const savedSettings =
            localStorage.getItem(
                "brandosSettings"
            );


        if (!savedSettings) {
            return;
        }


        try {

            const parsedSettings =
                JSON.parse(
                    savedSettings
                );


            setNotifications(
                parsedSettings.notifications ?? true
            );


            setProductUpdates(
                parsedSettings.productUpdates ?? false
            );


        } catch (error) {

            console.log(
                "Unable to load BrandOS settings:",
                error
            );

        }

    }, []);


    /* =========================================================
       AUTO SAVE PREFERENCES
    ========================================================= */

    useEffect(() => {

        const settings = {

            notifications,

            productUpdates

        };


        localStorage.setItem(
            "brandosSettings",
            JSON.stringify(settings)
        );

    }, [
        notifications,
        productUpdates
    ]);


    /* =========================================================
       LOGOUT
    ========================================================= */

    const handleLogout = () => {

        logout();

        navigate("/login");

    };


    /* =========================================================
       RESET LOCAL PREFERENCES
    ========================================================= */

    const handleResetPreferences = () => {

        localStorage.removeItem(
            "brandosSettings"
        );


        setNotifications(true);

        setProductUpdates(false);

    };


    /* =========================================================
       DELETE ACCOUNT
    ========================================================= */

    const handleDeleteAccount = async () => {

        if (deleteConfirmation !== "DELETE") {
            return;
        }


        try {

            setDeleting(true);

            setErrorMessage("");


            await api.delete(
                "/auth/account"
            );


            localStorage.removeItem(
                "brandosSettings"
            );


            logout();


            navigate("/");


        } catch (error) {

            console.log(
                "DELETE ACCOUNT ERROR:",
                error
            );


            setErrorMessage(
                error.response?.data?.message ||
                "Unable to delete your account."
            );


            setDeleting(false);

        }

    };


    const closeDeleteModal = () => {

        if (deleting) {
            return;
        }


        setDeleteModalOpen(false);

        setDeleteConfirmation("");

        setErrorMessage("");

    };


    return (

        <div className="mx-auto max-w-5xl">


            {/* PAGE HEADER */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-gray-900">
                    Settings
                </h1>

                <p className="mt-2 text-gray-600">
                    Manage your BrandOS account,
                    preferences and subscription.
                </p>

            </div>


            {/* ACCOUNT */}

            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                            <UserRound size={22} />

                        </div>


                        <div>

                            <h2 className="text-lg font-bold text-gray-900">
                                Account
                            </h2>

                            <p className="text-sm text-gray-500">
                                Manage your name,
                                email and password.
                            </p>

                        </div>

                    </div>


                    <button
                        onClick={() =>
                            navigate("/account")
                        }
                        className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        Manage Account

                        <ChevronRight size={17} />
                    </button>

                </div>

            </div>


            {/* NOTIFICATIONS */}

            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">

                        <Bell size={21} />

                    </div>


                    <div>

                        <h2 className="text-lg font-bold text-gray-900">
                            Notifications
                        </h2>

                        <p className="text-sm text-gray-500">
                            Choose which BrandOS updates
                            you would like to receive.
                        </p>

                    </div>

                </div>


                <div className="divide-y divide-gray-100">


                    {/* EMAIL NOTIFICATIONS */}

                    <div className="flex items-center justify-between gap-4 py-4">

                        <div>

                            <p className="font-medium text-gray-900">
                                Email Notifications
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Receive account and
                                content-related updates.
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                setNotifications(
                                    !notifications
                                )
                            }
                            className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                                notifications
                                    ? "bg-blue-600"
                                    : "bg-gray-300"
                            }`}
                        >

                            <span
                                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                                    notifications
                                        ? "left-6"
                                        : "left-1"
                                }`}
                            />

                        </button>

                    </div>


                    {/* PRODUCT UPDATES */}

                    <div className="flex items-center justify-between gap-4 py-4">

                        <div>

                            <p className="font-medium text-gray-900">
                                Product Updates
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Receive information about
                                new BrandOS features.
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                setProductUpdates(
                                    !productUpdates
                                )
                            }
                            className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                                productUpdates
                                    ? "bg-blue-600"
                                    : "bg-gray-300"
                            }`}
                        >

                            <span
                                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                                    productUpdates
                                        ? "left-6"
                                        : "left-1"
                                }`}
                            />

                        </button>

                    </div>

                </div>


                <p className="mt-4 text-xs text-gray-400">
                    Preferences are saved automatically
                    on this device.
                </p>

            </div>


            {/* SECURITY */}

            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">

                        <ShieldCheck size={22} />

                    </div>


                    <div>

                        <h2 className="text-lg font-bold text-gray-900">
                            Security
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Your BrandOS account uses
                            secure password hashing and
                            authenticated access to
                            protected application features.
                        </p>

                    </div>

                </div>

            </div>


            {/* PLAN */}

            <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">

                            <CreditCard size={22} />

                        </div>


                        <div>

                            <h2 className="text-lg font-bold text-gray-900">
                                Current Plan
                            </h2>

                            <p className="text-sm text-gray-500">
                                You are currently using
                                the BrandOS Free plan.
                            </p>

                        </div>

                    </div>


                    <button
                        onClick={() =>
                            navigate("/pricing")
                        }
                        className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                        View Plans
                    </button>

                </div>

            </div>


            {/* DANGER ZONE */}

            <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">

                        <AlertTriangle size={21} />

                    </div>


                    <div>

                        <h2 className="text-xl font-bold text-red-600">
                            Danger Zone
                        </h2>

                        <p className="text-sm text-gray-500">
                            Manage destructive account
                            actions carefully.
                        </p>

                    </div>

                </div>


                <div className="mt-6 space-y-4">


                    {/* RESET PREFERENCES */}

                    <div className="flex flex-col justify-between gap-4 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center">

                        <div>

                            <p className="font-semibold text-gray-900">
                                Reset Preferences
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Remove saved notification
                                preferences from this browser.
                            </p>

                        </div>


                        <button
                            onClick={handleResetPreferences}
                            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
                        >

                            <Trash2 size={17} />

                            Reset

                        </button>

                    </div>


                    {/* DELETE ACCOUNT */}

                    <div className="flex flex-col justify-between gap-4 rounded-xl border border-red-300 bg-red-50/40 p-4 sm:flex-row sm:items-center">

                        <div>

                            <p className="font-semibold text-red-700">
                                Delete Account
                            </p>

                            <p className="mt-1 max-w-xl text-sm text-gray-600">
                                Permanently delete your
                                BrandOS account, business
                                profile, generated content,
                                SEO analyses and tone analyses.
                            </p>

                            <p className="mt-2 text-xs font-medium text-red-600">
                                This action cannot be undone.
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                setDeleteModalOpen(true)
                            }
                            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700"
                        >

                            <Trash2 size={17} />

                            Delete Account

                        </button>

                    </div>

                </div>

            </div>


            {/* DELETE ACCOUNT MODAL */}

            {
                deleteModalOpen && (

                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">

                        <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">


                            {/* MODAL HEADER */}

                            <div className="flex items-start justify-between gap-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">

                                        <AlertTriangle size={23} />

                                    </div>


                                    <div>

                                        <h2 className="text-2xl font-bold text-gray-900">
                                            Delete Account?
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            This action is permanent.
                                        </p>

                                    </div>

                                </div>


                                <button
                                    onClick={closeDeleteModal}
                                    disabled={deleting}
                                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                                >
                                    <X size={20} />
                                </button>

                            </div>


                            {/* WARNING */}

                            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">

                                <p className="font-semibold text-red-700">
                                    The following data will
                                    be permanently deleted:
                                </p>


                                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-red-700">

                                    <li>
                                        Your BrandOS account
                                    </li>

                                    <li>
                                        Your business profile
                                    </li>

                                    <li>
                                        Generated content history
                                    </li>

                                    <li>
                                        SEO analysis results
                                    </li>

                                    <li>
                                        Tone analysis results
                                    </li>

                                </ul>

                            </div>


                            {/* CONFIRMATION */}

                            <div className="mt-6">

                                <label className="mb-2 block text-sm font-semibold text-gray-700">

                                    Type{" "}

                                    <span className="font-bold text-red-600">
                                        DELETE
                                    </span>

                                    {" "}to confirm

                                </label>


                                <input
                                    type="text"
                                    value={deleteConfirmation}
                                    onChange={(e) =>
                                        setDeleteConfirmation(
                                            e.target.value
                                        )
                                    }
                                    disabled={deleting}
                                    placeholder="DELETE"
                                    autoComplete="off"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100 disabled:bg-gray-100"
                                />

                            </div>


                            {/* ERROR */}

                            {
                                errorMessage && (

                                    <div className="mt-4 rounded-xl bg-red-100 p-4 text-sm text-red-700">

                                        {errorMessage}

                                    </div>

                                )
                            }


                            {/* ACTIONS */}

                            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                                <button
                                    onClick={closeDeleteModal}
                                    disabled={deleting}
                                    className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>


                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={
                                        deleteConfirmation !== "DELETE" ||
                                        deleting
                                    }
                                    className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
                                >

                                    {
                                        deleting
                                            ? "Deleting Account..."
                                            : "Permanently Delete Account"
                                    }

                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>

    );

}


export default Settings;