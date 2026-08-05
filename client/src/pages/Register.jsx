import { useState } from "react";
import { Link } from "react-router-dom";
import {
    User,
    Mail,
    LockKeyhole,
    Eye,
    EyeOff
} from "lucide-react";

import api from "../services/api";


function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.password !== confirmPassword) {

            setMessage("Passwords do not match.");

            return;

        }

        try {

            setLoading(true);
            setMessage("");

            await api.post(
                "/auth/register",
                formData
            );

            setMessage("Account created successfully 🚀");

            setFormData({
                name: "",
                email: "",
                password: ""
            });

            setConfirmPassword("");

        } catch (error) {

            console.log(error.response?.data);

            setMessage(
                error.response?.data?.message ||
                "Registration failed."
            );

        } finally {

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
                    className="mx-auto mb-7 flex h-32 w-32 flex-col items-center justify-center rounded-3xl border border-white bg-white/90 shadow-2xl backdrop-blur"
                >

                    <span className="-skew-x-12 text-5xl font-black italic leading-none text-blue-600">
                        B
                    </span>

                    <span className="mt-1 text-lg font-bold text-gray-900">
                        BrandOS
                    </span>

                    <span className="text-[6px] uppercase tracking-[0.22em] text-gray-400">
                        Build. Manage. Grow.
                    </span>

                </Link>


                <div className="overflow-hidden rounded-3xl border border-white bg-white/90 shadow-2xl backdrop-blur-xl">

                    <div className="border-b border-gray-100 px-7 py-5">

                        <h1 className="text-3xl font-bold text-gray-900">
                            Create Your Account
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Start building your brand with BrandOS.
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 p-7"
                    >

                        <div className="relative">

                            <User
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full name"
                                required
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />

                        </div>


                        <div className="relative">

                            <Mail
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />

                        </div>


                        <div className="relative">

                            <LockKeyhole
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                required
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-12 outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                            >

                                {
                                    showPassword
                                        ? <EyeOff size={20} />
                                        : <Eye size={20} />
                                }

                            </button>

                        </div>


                        <div className="relative">

                            <LockKeyhole
                                size={19}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="Confirm your password"
                                required
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-12 outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                            >

                                {
                                    showConfirmPassword
                                        ? <EyeOff size={20} />
                                        : <Eye size={20} />
                                }

                            </button>

                        </div>


                        <select className="w-full rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-500 outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100">

                            <option>
                                Select your industry
                            </option>

                            <option>
                                Retail
                            </option>

                            <option>
                                Hospitality
                            </option>

                            <option>
                                Technology
                            </option>

                            <option>
                                Professional Services
                            </option>

                        </select>


                        {
                            message && (

                                <div className={`rounded-xl p-4 text-sm ${
                                    message.includes("successfully")
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
                                    ? "Creating Account..."
                                    : "Create Account"
                            }

                        </button>


                        <p className="text-center text-sm text-gray-500">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="font-bold text-blue-600 hover:underline"
                            >
                                Sign in
                            </Link>

                        </p>

                    </form>

                </div>

            </div>

        </div>

    );

}


export default Register;