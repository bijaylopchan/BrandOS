import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    LockKeyhole,
    Mail,
    Eye,
    EyeOff
} from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext.jsx";


function Login() {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);
            setMessage("");

            const response = await api.post(
                "/auth/login",
                formData
            );

            login(response.data.token);

            setMessage(
                "Login successful! Redirecting... 🚀"
            );

            setTimeout(() => {

                navigate("/dashboard");

            }, 800);

        } catch (error) {

            console.log(error.response?.data);

            setMessage(
                error.response?.data?.message ||
                "Login failed. Please check your details."
            );

            setLoading(false);

        }

    };


    return (

        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 py-12">

            <div className="absolute -left-36 bottom-[-120px] h-[520px] w-[520px] rounded-full bg-blue-200/50 blur-3xl" />

            <div className="absolute -right-44 top-28 h-[430px] w-[430px] rounded-full bg-purple-200/50 blur-3xl" />

            <div className="absolute -top-52 right-40 h-[420px] w-[600px] rounded-[45%] bg-blue-100/70 blur-3xl" />


            <div className="relative z-10 w-full max-w-md">

                <Link
                    to="/"
                    className="mx-auto mb-8 flex h-36 w-36 flex-col items-center justify-center rounded-3xl border border-white bg-white/90 shadow-2xl backdrop-blur"
                >

                    <span className="-skew-x-12 text-6xl font-black italic leading-none text-blue-600">
                        B
                    </span>

                    <span className="mt-1 text-xl font-bold text-gray-900">
                        BrandOS
                    </span>

                    <span className="text-[7px] uppercase tracking-[0.24em] text-gray-400">
                        Build. Manage. Grow.
                    </span>

                </Link>


                <div className="rounded-3xl border border-white bg-white/90 p-7 shadow-2xl backdrop-blur-xl">

                    <div className="text-center">

                        <h1 className="text-4xl font-bold text-gray-900">
                            Welcome Back
                        </h1>

                        <p className="mt-2 text-gray-600">
                            Sign in to continue to BrandOS.
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                    >

                        <div className="relative">

                            <Mail
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email address"
                                required
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />

                        </div>


                        <div className="relative">

                            <LockKeyhole
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                required
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-12 text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                            >

                                {
                                    showPassword
                                        ? <EyeOff size={20} />
                                        : <Eye size={20} />
                                }

                            </button>

                        </div>


                        <div className="text-right">

                            <button
                                type="button"
                                className="text-sm font-medium text-blue-600 hover:underline"
                            >
                                Forgot password?
                            </button>

                        </div>


                        {
                            message && (

                                <div className={`rounded-xl p-4 text-sm ${
                                    message.includes("successful")
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}>

                                    {message}

                                </div>

                            )
                        }


                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                        >

                            {
                                loading
                                    ? "Signing In..."
                                    : "SIGN IN"
                            }

                        </button>

                    </form>


                    <div className="my-6 flex items-center gap-3">

                        <div className="h-px flex-1 bg-gray-200" />

                        <span className="text-sm text-gray-400">
                            or continue with
                        </span>

                        <div className="h-px flex-1 bg-gray-200" />

                    </div>


                    <div className="grid grid-cols-3 gap-3">

                        <button
                            type="button"
                            className="rounded-xl border border-gray-200 bg-white py-3 font-bold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            G
                        </button>

                        <button
                            type="button"
                            className="rounded-xl border border-gray-200 bg-white py-3 font-semibold text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            GitHub
                        </button>

                        <button
                            type="button"
                            className="rounded-xl border border-gray-200 bg-white py-3 font-bold text-blue-600 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            f
                        </button>

                    </div>


                    <p className="mt-6 text-center text-sm text-gray-500">

                        Don&apos;t have an account yet?{" "}

                        <Link
                            to="/register"
                            className="font-bold text-blue-600 hover:underline"
                        >
                            Register for free
                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}


export default Login;