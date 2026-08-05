function PaywallModal({ onClose, onUpgrade }) {

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">

            <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">

                <div className="flex items-start justify-between gap-4">

                    <div>

                        <p className="font-medium text-blue-600">
                            BrandOS Pro
                        </p>

                        <h2 className="mt-1 text-3xl font-bold">
                            Unlock premium tools
                        </h2>

                    </div>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-400 hover:text-gray-700"
                    >
                        ×
                    </button>

                </div>


                <p className="mt-4 text-gray-600">
                    Upgrade your demo account to unlock advanced content
                    analysis and reporting.
                </p>


                <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">

                    <div className="flex items-end gap-2">

                        <span className="text-4xl font-bold text-blue-700">
                            $9
                        </span>

                        <span className="pb-1 text-gray-500">
                            / month
                        </span>

                    </div>

                    <ul className="mt-5 space-y-3 text-gray-700">

                        <li>✓ Unlimited content generation</li>
                        <li>✓ SEO analysis</li>
                        <li>✓ Tone analysis</li>
                        <li>✓ Advanced analytics</li>
                        <li>✓ Full content history</li>

                    </ul>

                </div>


                <p className="mt-4 text-sm text-gray-500">
                    Demo only — no payment will be processed.
                </p>


                <div className="mt-6 flex gap-3">

                    <button
                        onClick={onClose}
                        className="flex-1 rounded-lg border px-5 py-3 font-medium hover:bg-gray-50"
                    >
                        Maybe Later
                    </button>

                    <button
                        onClick={onUpgrade}
                        className="flex-1 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                    >
                        Upgrade to Pro
                    </button>

                </div>

            </div>

        </div>

    );

}


export default PaywallModal;