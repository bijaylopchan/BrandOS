import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
    CheckCircle2,
    ChevronDown,
    CreditCard,
    Info,
    LockKeyhole,
    Search
} from "lucide-react";

import { FaApple } from "react-icons/fa";


/* ---------------- PAYMENT MARKS ---------------- */

function VisaMark() {
    return (
        <div className="flex h-7 w-12 items-center justify-center rounded border border-gray-200 bg-white">
            <span className="text-[13px] font-black italic tracking-tight text-[#1434CB]">
                VISA
            </span>
        </div>
    );
}


function MastercardMark() {
    return (
        <div className="flex h-7 w-12 items-center justify-center rounded border border-gray-200 bg-white">
            <div className="relative h-5 w-8">
                <div className="absolute left-0 top-0 h-5 w-5 rounded-full bg-[#EB001B]" />
                <div className="absolute right-0 top-0 h-5 w-5 rounded-full bg-[#F79E1B] opacity-90" />
            </div>
        </div>
    );
}


function PayPalMark() {
    return (
        <div
            className="flex items-center"
            style={{
                fontFamily: "Arial, Helvetica, sans-serif",
                fontStyle: "italic",
                fontWeight: 800,
                letterSpacing: "-1.4px"
            }}
        >
            <span className="text-[25px] text-[#003087]">
                Pay
            </span>

            <span className="text-[25px] text-[#009CDE]">
                Pal
            </span>
        </div>
    );
}


function GoogleG() {
    return (
        <span
            className="inline-block text-[25px] font-black leading-none"
            style={{
                fontFamily: "Arial, Helvetica, sans-serif",
                background:
                    "conic-gradient(from -45deg, #4285F4 0deg 90deg, #34A853 90deg 180deg, #FBBC05 180deg 270deg, #EA4335 270deg 360deg)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent"
            }}
        >
            G
        </span>
    );
}


function GooglePayMark({ light = false }) {
    return (
        <div className="flex items-center gap-1.5">
            <GoogleG />

            <span
                className={`text-[25px] font-normal tracking-tight ${
                    light ? "text-white" : "text-gray-900"
                }`}
                style={{
                    fontFamily: "Arial, Helvetica, sans-serif"
                }}
            >
                Pay
            </span>
        </div>
    );
}


function ApplePayMark() {
    return (
        <div className="flex items-center gap-1.5 text-white">
            <FaApple size={25} />

            <span className="text-xl font-semibold">
                Pay
            </span>
        </div>
    );
}


/* ---------------- CHECKOUT PAGE ---------------- */

function DemoCheckout() {
    const { plan } = useParams();

    const [paymentMethod, setPaymentMethod] = useState("card");
    const [message, setMessage] = useState("");


    const selectedPlan =
        plan === "pro"
            ? {
                  name: "BrandOS Pro",
                  price: "$19.00"
              }
            : {
                  name: "BrandOS Premium",
                  price: "$9.00"
              };


    const showPaymentUnavailable = () => {
        setMessage(
            "This checkout is for presentation purposes only. No payment information has been submitted or processed."
        );
    };


    const handlePayment = (e) => {
        e.preventDefault();

        showPaymentUnavailable();
    };


    const handleExpressPayment = (method) => {
        setPaymentMethod(method);
        showPaymentUnavailable();
    };


    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:py-14">

            <div className="mx-auto max-w-6xl">


                {/* Breadcrumb */}

                <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">

                    <Link
                        to="/pricing"
                        className="transition hover:text-blue-600"
                    >
                        Pricing
                    </Link>

                    <span>/</span>

                    <span className="font-medium text-blue-600">
                        Checkout
                    </span>

                </div>


                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_0.7fr]">


                    {/* LEFT SIDE */}

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">


                        {/* Header */}

                        <div className="border-b border-gray-200 p-6 sm:p-8">

                            <div>

                                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-600">
                                    BrandOS Checkout
                                </p>

                                <h1 className="text-3xl font-bold text-gray-900">
                                    Checkout
                                </h1>

                                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">

                                    <LockKeyhole size={14} />

                                    <span>
                                        Secure checkout
                                    </span>

                                </div>

                            </div>

                        </div>


                        <form
                            onSubmit={handlePayment}
                            className="p-6 sm:p-8"
                            autoComplete="off"
                        >


                            {/* EXPRESS CHECKOUT */}

                            <section>

                                <h2 className="font-semibold text-gray-900">
                                    Express checkout
                                </h2>


                                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">


                                    {/* Apple Pay */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleExpressPayment("apple")
                                        }
                                        className="flex h-14 items-center justify-center rounded-lg bg-black transition hover:bg-gray-800"
                                    >
                                        <ApplePayMark />
                                    </button>


                                    {/* PayPal */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleExpressPayment("paypal")
                                        }
                                        className="flex h-14 items-center justify-center rounded-lg bg-[#FFC439] transition hover:brightness-95"
                                    >
                                        <PayPalMark />
                                    </button>


                                    {/* Google Pay */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleExpressPayment("google")
                                        }
                                        className="flex h-14 items-center justify-center rounded-lg bg-black transition hover:bg-gray-800"
                                    >
                                        <GooglePayMark light />
                                    </button>

                                </div>


                                {/* Divider */}

                                <div className="my-7 flex items-center gap-4">

                                    <div className="h-px flex-1 bg-gray-200" />

                                    <span className="text-xs font-medium text-gray-400">
                                        OR
                                    </span>

                                    <div className="h-px flex-1 bg-gray-200" />

                                </div>

                            </section>


                            {/* CONTACT */}

                            <section>

                                <div className="flex items-center justify-between gap-4">

                                    <h2 className="text-lg font-bold text-gray-900">
                                        Contact
                                    </h2>

                                    <Link
                                        to="/login"
                                        className="text-sm font-medium text-blue-600 hover:underline"
                                    >
                                        Sign in
                                    </Link>

                                </div>


                                <input
                                    type="email"
                                    placeholder="Email"
                                    autoComplete="off"
                                    className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />


                                <label className="mt-3 flex items-center gap-2 text-sm text-gray-700">

                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="h-4 w-4 accent-blue-600"
                                    />

                                    Email me with news and offers

                                </label>

                            </section>


                            {/* BILLING INFORMATION */}

                            <section className="mt-8">

                                <h2 className="text-lg font-bold text-gray-900">
                                    Billing information
                                </h2>


                                <div className="mt-4 space-y-3">


                                    {/* Country */}

                                    <div className="relative">

                                        <select
                                            defaultValue="Australia"
                                            className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        >
                                            <option>Australia</option>
                                            <option>New Zealand</option>
                                            <option>United States</option>
                                            <option>United Kingdom</option>
                                        </select>

                                        <ChevronDown
                                            size={17}
                                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                        />

                                    </div>


                                    {/* Name */}

                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                                        <input
                                            type="text"
                                            placeholder="First name"
                                            autoComplete="off"
                                            className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        />

                                        <input
                                            type="text"
                                            placeholder="Last name"
                                            autoComplete="off"
                                            className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        />

                                    </div>


                                    {/* Address */}

                                    <div className="relative">

                                        <input
                                            type="text"
                                            placeholder="Address"
                                            autoComplete="off"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-11 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        />

                                        <Search
                                            size={18}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                    </div>


                                    <input
                                        type="text"
                                        placeholder="Apartment, suite, etc. (optional)"
                                        autoComplete="off"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />


                                    {/* Suburb / State / Postcode */}

                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                                        <input
                                            type="text"
                                            placeholder="Suburb"
                                            autoComplete="off"
                                            className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        />


                                        <select
                                            defaultValue="Victoria"
                                            className="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        >
                                            <option>Victoria</option>
                                            <option>New South Wales</option>
                                            <option>Queensland</option>
                                            <option>South Australia</option>
                                            <option>Western Australia</option>
                                            <option>Tasmania</option>
                                            <option>ACT</option>
                                            <option>Northern Territory</option>
                                        </select>


                                        <input
                                            type="text"
                                            placeholder="Postcode"
                                            autoComplete="off"
                                            className="rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        />

                                    </div>


                                    <input
                                        type="tel"
                                        placeholder="Phone"
                                        autoComplete="off"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                </div>


                                <label className="mt-4 flex items-center gap-2 text-sm text-gray-700">

                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 accent-blue-600"
                                    />

                                    Save this information for next time

                                </label>

                            </section>


                            {/* PAYMENT */}

                            <section className="mt-9">

                                <h2 className="text-lg font-bold text-gray-900">
                                    Payment
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    All transactions are secure and encrypted.
                                </p>


                                <div className="mt-4 overflow-hidden rounded-xl border border-gray-300">


                                    {/* CREDIT CARD */}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPaymentMethod("card");
                                            setMessage("");
                                        }}
                                        className={`flex w-full items-center justify-between px-4 py-4 text-left ${
                                            paymentMethod === "card"
                                                ? "bg-blue-50"
                                                : "bg-white"
                                        }`}
                                    >

                                        <div className="flex items-center gap-3">

                                            <span
                                                className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                                                    paymentMethod === "card"
                                                        ? "border-blue-600"
                                                        : "border-gray-400"
                                                }`}
                                            >

                                                {paymentMethod === "card" && (
                                                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                                                )}

                                            </span>


                                            <CreditCard
                                                size={17}
                                                className="text-gray-600"
                                            />

                                            <span className="font-medium">
                                                Credit card
                                            </span>

                                        </div>


                                        <div className="flex items-center gap-2">
                                            <VisaMark />
                                            <MastercardMark />
                                        </div>

                                    </button>


                                    {/* CARD FIELDS */}

                                    {paymentMethod === "card" && (

                                        <div className="space-y-3 border-t border-gray-200 bg-gray-50 p-4">


                                            <div className="relative">

                                                <input
                                                    type="text"
                                                    placeholder="Card number"
                                                    autoComplete="off"
                                                    inputMode="numeric"
                                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pr-11 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                                />

                                                <LockKeyhole
                                                    size={15}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                                />

                                            </div>


                                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                                                <input
                                                    type="text"
                                                    placeholder="Expiration date (MM / YY)"
                                                    autoComplete="off"
                                                    inputMode="numeric"
                                                    className="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                                />

                                                <input
                                                    type="text"
                                                    placeholder="Security code"
                                                    autoComplete="off"
                                                    inputMode="numeric"
                                                    className="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                                />

                                            </div>


                                            <input
                                                type="text"
                                                placeholder="Name on card"
                                                autoComplete="off"
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                            />

                                        </div>

                                    )}


                                    {/* PAYPAL */}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPaymentMethod("paypal");
                                            setMessage("");
                                        }}
                                        className={`flex w-full items-center justify-between border-t border-gray-200 px-4 py-4 ${
                                            paymentMethod === "paypal"
                                                ? "bg-blue-50"
                                                : "bg-white"
                                        }`}
                                    >

                                        <div className="flex items-center gap-3">

                                            <span
                                                className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                                                    paymentMethod === "paypal"
                                                        ? "border-blue-600"
                                                        : "border-gray-400"
                                                }`}
                                            >

                                                {paymentMethod === "paypal" && (
                                                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                                                )}

                                            </span>

                                            <span className="font-medium">
                                                PayPal
                                            </span>

                                        </div>

                                        <PayPalMark />

                                    </button>


                                    {/* GOOGLE PAY */}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPaymentMethod("google");
                                            setMessage("");
                                        }}
                                        className={`flex w-full items-center justify-between border-t border-gray-200 px-4 py-4 ${
                                            paymentMethod === "google"
                                                ? "bg-blue-50"
                                                : "bg-white"
                                        }`}
                                    >

                                        <div className="flex items-center gap-3">

                                            <span
                                                className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                                                    paymentMethod === "google"
                                                        ? "border-blue-600"
                                                        : "border-gray-400"
                                                }`}
                                            >

                                                {paymentMethod === "google" && (
                                                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                                                )}

                                            </span>

                                            <span className="font-medium">
                                                Google Pay
                                            </span>

                                        </div>

                                        <GooglePayMark />

                                    </button>

                                </div>

                            </section>


                            {/* PAYMENT WARNING - ONLY APPEARS AFTER PAY ATTEMPT */}

                            {message && (

                                <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">

                                    <Info
                                        size={20}
                                        className="mt-0.5 shrink-0"
                                    />

                                    <div>

                                        <p className="font-semibold">
                                            Payment unavailable
                                        </p>

                                        <p className="mt-1 text-sm">
                                            {message}
                                        </p>

                                    </div>

                                </div>

                            )}


                            {/* PAY BUTTON */}

                            <button
                                type="submit"
                                className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
                            >
                                Pay now
                            </button>

                        </form>

                    </div>


                    {/* RIGHT SIDE - ORDER SUMMARY */}

                    <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-28">

                        <h2 className="text-xl font-bold text-gray-900">
                            Order summary
                        </h2>


                        <div className="mt-6 flex items-center gap-4 border-b border-gray-200 pb-6">

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-xl font-bold text-white shadow-md">
                                B
                            </div>


                            <div className="min-w-0 flex-1">

                                <h3 className="font-bold text-gray-900">
                                    {selectedPlan.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Monthly subscription
                                </p>

                            </div>


                            <span className="font-bold">
                                {selectedPlan.price}
                            </span>

                        </div>


                        {/* PRICES */}

                        <div className="space-y-4 border-b border-gray-200 py-6">

                            <div className="flex justify-between text-gray-600">

                                <span>
                                    Subtotal
                                </span>

                                <span>
                                    {selectedPlan.price}
                                </span>

                            </div>


                            <div className="flex justify-between text-gray-600">

                                <span>
                                    Tax
                                </span>

                                <span>
                                    $0.00
                                </span>

                            </div>

                        </div>


                        <div className="flex items-end justify-between py-6">

                            <span className="text-lg font-bold">
                                Total
                            </span>


                            <div className="text-right">

                                <span className="mr-2 text-sm text-gray-500">
                                    AUD
                                </span>

                                <span className="text-2xl font-bold">
                                    {selectedPlan.price}
                                </span>

                            </div>

                        </div>


                        {/* FEATURES */}

                        <div className="space-y-3 border-t border-gray-200 pt-6 text-sm text-gray-600">

                            <div className="flex items-center gap-2">

                                <CheckCircle2
                                    size={17}
                                    className="text-blue-600"
                                />

                                AI content generation

                            </div>


                            <div className="flex items-center gap-2">

                                <CheckCircle2
                                    size={17}
                                    className="text-blue-600"
                                />

                                SEO & tone analysis

                            </div>


                            <div className="flex items-center gap-2">

                                <CheckCircle2
                                    size={17}
                                    className="text-blue-600"
                                />

                                Content history & storage

                            </div>


                            <div className="flex items-center gap-2">

                                <CheckCircle2
                                    size={17}
                                    className="text-blue-600"
                                />

                                Analytics dashboard

                            </div>

                        </div>


                        <Link
                            to="/pricing"
                            className="mt-8 block text-center text-sm font-medium text-gray-500 transition hover:text-blue-600"
                        >
                            ← Return to pricing
                        </Link>

                    </aside>

                </div>

            </div>

        </div>
    );
}


export default DemoCheckout;