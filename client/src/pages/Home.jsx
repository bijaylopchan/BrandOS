import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


function Home() {

    const { token } = useAuth();


    const scrollToFeatures = () => {

        document
            .getElementById("features")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    };


    return (

        <div className="overflow-hidden bg-gray-50">


            {/* Hero Section */}

            <section className="relative min-h-[90vh] flex items-center px-6 py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">


                {/* Decorative background shapes */}

                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse" />

                <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse" />


                <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">


                    {/* Hero Text */}

                    <div className="home-fade-up">


                        <p className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium mb-6 shadow-sm">

                            ✨ AI-powered marketing for small businesses

                        </p>


                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">

                            Create better content

                            <span className="text-blue-600">
                                {" "}faster with BrandOS
                            </span>

                        </h1>


                        <p className="mt-6 text-xl text-gray-600 max-w-xl leading-relaxed">

                            Generate blog posts, social media captions and email
                            campaigns using your saved business profile and brand tone.

                        </p>


                        <div className="mt-8 flex flex-wrap gap-4">


                            <Link
                                to={token ? "/generator" : "/register"}
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 hover:scale-105 transition duration-300"
                            >

                                {
                                    token
                                        ? "Start Creating 🚀"
                                        : "Get Started Free 🚀"
                                }

                            </Link>


                            <button
                                onClick={scrollToFeatures}
                                className="border border-gray-300 bg-white px-8 py-3 rounded-lg font-medium shadow-sm hover:bg-gray-100 hover:-translate-y-1 hover:scale-105 transition duration-300"
                            >

                                Learn More

                            </button>


                        </div>


                        <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-500">

                            <span>✓ Brand profile memory</span>

                            <span>✓ SEO analysis</span>

                            <span>✓ Tone analysis</span>

                        </div>


                    </div>



                    {/* Product Preview */}

                    <div className="home-float">


                        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl border border-white p-8 hover:shadow-blue-200 transition duration-500">


                            <div className="flex justify-between items-center mb-6">


                                <div>

                                    <p className="text-sm text-gray-500">
                                        BrandOS Generator
                                    </p>

                                    <h2 className="text-2xl font-bold">
                                        Sunrise Coffee
                                    </h2>

                                </div>


                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm animate-pulse">

                                    ● Ready

                                </span>


                            </div>


                            <div className="space-y-4">


                                <div className="bg-gray-100 rounded-lg p-4 hover:bg-blue-50 transition duration-300">

                                    <p className="text-sm text-gray-500">
                                        Content Type
                                    </p>

                                    <p className="font-medium">
                                        Social Media Caption
                                    </p>

                                </div>


                                <div className="bg-gray-100 rounded-lg p-4 hover:bg-blue-50 transition duration-300">

                                    <p className="text-sm text-gray-500">
                                        Brand Tone
                                    </p>

                                    <p className="font-medium">
                                        Friendly
                                    </p>

                                </div>


                                <div className="border border-gray-200 rounded-lg p-5 bg-white">

                                    <p className="font-medium mb-2">
                                        Generated Preview
                                    </p>

                                    <p className="text-gray-600 leading-relaxed">

                                        Start your morning with fresh coffee, warm
                                        service and the perfect place to recharge. ☕

                                    </p>

                                </div>


                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">

                                    <div className="home-progress h-full bg-blue-600 rounded-full" />

                                </div>


                            </div>


                        </div>


                    </div>


                </div>


            </section>



            {/* Features Section */}

            <section
                id="features"
                className="py-24 px-6 bg-white"
            >


                <div className="max-w-6xl mx-auto">


                    <div className="text-center max-w-2xl mx-auto">


                        <p className="text-blue-600 font-medium">
                            Everything in one place
                        </p>

                        <h2 className="text-4xl font-bold mt-2">
                            Powerful tools for your brand
                        </h2>

                        <p className="text-gray-600 mt-4 leading-relaxed">

                            Create, analyse, edit and manage your marketing content
                            without switching between different tools.

                        </p>


                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">


                        <div className="home-feature-card bg-gray-50 p-6 rounded-xl border">

                            <div className="text-4xl mb-4">
                                ✨
                            </div>

                            <h3 className="text-xl font-bold">
                                AI Generator
                            </h3>

                            <p className="text-gray-600 mt-2">

                                Create blogs, captions and email campaigns using your
                                business profile.

                            </p>

                        </div>



                        <div className="home-feature-card bg-gray-50 p-6 rounded-xl border">

                            <div className="text-4xl mb-4">
                                🔍
                            </div>

                            <h3 className="text-xl font-bold">
                                SEO Analysis
                            </h3>

                            <p className="text-gray-600 mt-2">

                                Review SEO scores, keywords and suggestions for your
                                generated content.

                            </p>

                        </div>



                        <div className="home-feature-card bg-gray-50 p-6 rounded-xl border">

                            <div className="text-4xl mb-4">
                                🎭
                            </div>

                            <h3 className="text-xl font-bold">
                                Tone Analysis
                            </h3>

                            <p className="text-gray-600 mt-2">

                                Check whether your content matches your chosen brand
                                voice.

                            </p>

                        </div>



                        <div className="home-feature-card bg-gray-50 p-6 rounded-xl border">

                            <div className="text-4xl mb-4">
                                📚
                            </div>

                            <h3 className="text-xl font-bold">
                                Content History
                            </h3>

                            <p className="text-gray-600 mt-2">

                                Save, edit, copy and manage all your previous content
                                in one place.

                            </p>

                        </div>


                    </div>


                </div>


            </section>



            {/* Final Call To Action */}

            <section className="py-24 px-6 bg-gradient-to-b from-white to-blue-50">


                <div className="home-cta max-w-5xl mx-auto relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-10 md:p-14 text-center shadow-2xl">


                    <div className="absolute -top-20 -left-20 w-60 h-60 bg-white rounded-full opacity-10" />

                    <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-purple-300 rounded-full opacity-20" />


                    <div className="relative z-10">


                        <h2 className="text-4xl font-bold">

                            Ready to build your brand faster?

                        </h2>


                        <p className="mt-4 text-blue-100 text-lg max-w-2xl mx-auto">

                            Create your business profile and start generating content
                            that matches your audience and tone.

                        </p>


                        <Link
                            to="/pricing"
                            className="inline-block mt-8 bg-white text-blue-600 px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-gray-100 hover:-translate-y-1 hover:scale-105 transition duration-300"
                        >

                            {
                                token
                                    ? "Open Generator 🚀"
                                    : "Create Your Account"
                            }

                        </Link>


                    </div>


                </div>


            </section>


        </div>

    );

}


export default Home;