import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


function Pricing() {

    const { token } = useAuth();


    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 py-20">

            <div className="mx-auto max-w-6xl">


                <div className="text-center">

                    <p className="font-semibold text-blue-600">
                        SIMPLE PRICING
                    </p>

                    <h1 className="mt-3 text-5xl font-bold text-gray-900">
                        Choose your BrandOS plan
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
                        Select a plan that fits your content needs.
                        This payment experience is a demonstration only.
                    </p>

                </div>


                <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">


                    {/* Free Plan */}

                    <div className="rounded-2xl border bg-white p-8 shadow-lg">

                        <p className="font-semibold text-gray-500">
                            FREE
                        </p>

                        <h2 className="mt-3 text-3xl font-bold">
                            $0
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Forever
                        </p>

                        <ul className="mt-8 space-y-4 text-gray-700">

                            <li>✓ 5 content generations</li>
                            <li>✓ Business profile</li>
                            <li>✓ Basic content history</li>
                            <li>— Advanced analytics</li>
                            <li>— SEO and tone reports</li>

                        </ul>

                        <Link
                            to={token ? "/generator" : "/register"}
                            className="mt-10 block rounded-lg border border-gray-300 px-6 py-3 text-center font-semibold hover:bg-gray-50"
                        >
                            Continue Free
                        </Link>

                    </div>



                    {/* Premium Plan */}

                    <div className="relative rounded-2xl border-2 border-blue-600 bg-white p-8 shadow-2xl">

                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                            MOST POPULAR
                        </span>

                        <p className="font-semibold text-blue-600">
                            PREMIUM
                        </p>

                        <div className="mt-3 flex items-end gap-2">

                            <h2 className="text-4xl font-bold">
                                $9
                            </h2>

                            <p className="pb-1 text-gray-500">
                                / month
                            </p>

                        </div>

                        <ul className="mt-8 space-y-4 text-gray-700">

                            <li>✓ 100 content generations</li>
                            <li>✓ SEO analysis</li>
                            <li>✓ Tone analysis</li>
                            <li>✓ Full content history</li>
                            <li>✓ Analytics dashboard</li>

                        </ul>

                        <Link
                            to="/checkout/premium"
                            className="mt-10 block rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white hover:bg-blue-700"
                        >
                            Choose Premium
                        </Link>

                    </div>



                    {/* Pro Plan */}

                    <div className="rounded-2xl border bg-gray-900 p-8 text-white shadow-xl">

                        <p className="font-semibold text-purple-300">
                            PRO
                        </p>

                        <div className="mt-3 flex items-end gap-2">

                            <h2 className="text-4xl font-bold">
                                $19
                            </h2>

                            <p className="pb-1 text-gray-400">
                                / month
                            </p>

                        </div>

                        <ul className="mt-8 space-y-4 text-gray-200">

                            <li>✓ Unlimited generation</li>
                            <li>✓ Advanced SEO reports</li>
                            <li>✓ Brand tone monitoring</li>
                            <li>✓ Advanced analytics</li>
                            <li>✓ Priority support</li>

                        </ul>

                        <Link
                            to="/checkout/pro"
                            className="mt-10 block rounded-lg bg-white px-6 py-3 text-center font-semibold text-gray-900 hover:bg-gray-100"
                        >
                            Choose Pro
                        </Link>

                    </div>


                </div>


                <p className="mt-10 text-center text-sm text-gray-500">
                    Demo pricing only. No genuine purchases or subscriptions are available.
                </p>

            </div>

        </div>

    );

}


export default Pricing;