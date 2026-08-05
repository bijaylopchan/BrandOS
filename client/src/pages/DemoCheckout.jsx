import { useState } from "react";
import { Link, useParams } from "react-router-dom";


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


    const handleDemoPayment = (e) => {

        e.preventDefault();

        setMessage(
            "Demo transaction declined. No payment was processed. This checkout is for presentation purposes only."
        );

    };


    return (

        <div className="min-h-screen bg-gray-100 px-6 py-16">

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">


                {/* Order Summary */}

                <div className="rounded-2xl bg-gray-900 p-8 text-white shadow-xl">

                    <p className="text-sm font-semibold text-blue-300">
                        BRANDOS DEMO CHECKOUT
                    </p>

                    <h1 className="mt-4 text-4xl font-bold">
                        {selectedPlan.name}
                    </h1>

                    <p className="mt-3 text-gray-300">
                        Monthly demo subscription
                    </p>

                    <div className="mt-10 border-t border-gray-700 pt-6">

                        <div className="flex justify-between">

                            <span>
                                Subscription
                            </span>

                            <span className="font-semibold">
                                {selectedPlan.price}
                            </span>

                        </div>

                        <div className="mt-4 flex justify-between text-gray-400">

                            <span>
                                Tax
                            </span>

                            <span>
                                $0.00
                            </span>

                        </div>

                        <div className="mt-6 flex justify-between border-t border-gray-700 pt-6 text-xl font-bold">

                            <span>
                                Total
                            </span>

                            <span>
                                {selectedPlan.price}
                            </span>

                        </div>

                    </div>

                    <p className="mt-8 rounded-lg bg-yellow-100 p-4 text-sm text-yellow-900">
                        Demonstration only. Do not enter real payment information.
                    </p>

                </div>



                {/* Payment Form */}

                <div className="rounded-2xl bg-white p-8 shadow-xl">

                    <h2 className="text-2xl font-bold">
                        Choose payment method
                    </h2>


                    <div className="mt-6 grid grid-cols-3 gap-3">

                        <button
                            type="button"
                            onClick={() => setPaymentMethod("card")}
                            className={`rounded-lg border px-4 py-3 font-medium ${
                                paymentMethod === "card"
                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                    : "border-gray-300"
                            }`}
                        >
                            Card
                        </button>

                        <button
                            type="button"
                            onClick={() => setPaymentMethod("apple")}
                            className={`rounded-lg border px-4 py-3 font-medium ${
                                paymentMethod === "apple"
                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                    : "border-gray-300"
                            }`}
                        >
                            Apple Pay
                        </button>

                        <button
                            type="button"
                            onClick={() => setPaymentMethod("paypal")}
                            className={`rounded-lg border px-4 py-3 font-medium ${
                                paymentMethod === "paypal"
                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                    : "border-gray-300"
                            }`}
                        >
                            PayPal
                        </button>

                    </div>


                    <form
                        onSubmit={handleDemoPayment}
                        className="mt-8"
                    >

                        {
                            paymentMethod === "card" ? (

                                <div className="space-y-5">

                                    <div>

                                        <label className="mb-2 block font-medium">
                                            Demo card number
                                        </label>

                                        <input
                                            value="4242 4242 4242 4242"
                                            readOnly
                                            className="w-full rounded-lg border bg-gray-100 p-3 text-gray-600"
                                        />

                                    </div>

                                    <div className="grid grid-cols-2 gap-4">

                                        <div>

                                            <label className="mb-2 block font-medium">
                                                Expiry
                                            </label>

                                            <input
                                                value="12 / 34"
                                                readOnly
                                                className="w-full rounded-lg border bg-gray-100 p-3 text-gray-600"
                                            />

                                        </div>

                                        <div>

                                            <label className="mb-2 block font-medium">
                                                Demo CVC
                                            </label>

                                            <input
                                                value="123"
                                                readOnly
                                                className="w-full rounded-lg border bg-gray-100 p-3 text-gray-600"
                                            />

                                        </div>

                                    </div>

                                </div>

                            ) : (

                                <div className="rounded-xl border bg-gray-50 p-8 text-center">

                                    <p className="text-xl font-semibold">
                                        {
                                            paymentMethod === "apple"
                                                ? "Apple Pay"
                                                : "PayPal"
                                        }
                                    </p>

                                    <p className="mt-3 text-gray-600">
                                        This is a simulated payment option.
                                        No external payment window will open.
                                    </p>

                                </div>

                            )
                        }


                        {
                            message && (

                                <div className="mt-6 rounded-lg bg-red-100 p-4 text-red-700">

                                    {message}

                                </div>

                            )
                        }


                        <button
                            type="submit"
                            className="mt-8 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            Attempt Demo Payment
                        </button>

                    </form>


                    <Link
                        to="/pricing"
                        className="mt-5 block text-center text-gray-500 hover:text-blue-600"
                    >
                        Return to pricing
                    </Link>

                </div>


            </div>

        </div>

    );

}


export default DemoCheckout;