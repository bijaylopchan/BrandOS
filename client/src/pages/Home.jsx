import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

import {
    Sparkles,
    Image,
    Brain,
    Search,
    MessageSquareText,
    History,
    Check,
    Upload,
    WandSparkles
} from "lucide-react";


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


            {/* =====================================================
                HERO SECTION
            ===================================================== */}

            <section className="relative flex min-h-[90vh] items-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 py-20">


                {/* DECORATIVE BACKGROUND */}

                <div className="absolute left-10 top-20 h-72 w-72 animate-pulse rounded-full bg-blue-200 opacity-30 blur-3xl" />

                <div className="absolute bottom-10 right-10 h-80 w-80 animate-pulse rounded-full bg-purple-200 opacity-30 blur-3xl" />


                <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">


                    {/* HERO TEXT */}

                    <div className="home-fade-up">


                        <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 font-medium text-blue-700 shadow-sm">

                            <Sparkles size={17} />

                            AI-powered marketing for small businesses

                        </p>


                        <h1 className="text-5xl font-bold leading-tight text-gray-900 md:text-6xl">

                            Create smarter content

                            <span className="text-blue-600">

                                {" "}with your brand in mind

                            </span>

                        </h1>


                        <p className="mt-6 max-w-xl text-xl leading-relaxed text-gray-600">

                            Turn your ideas, products and images into
                            brand-aware blog posts, social media captions
                            and email campaigns powered by AI.

                        </p>


                        {/* CTA BUTTONS */}

                        <div className="mt-8 flex flex-wrap gap-4">


                            <Link
                                to={
                                    token
                                        ? "/generator"
                                        : "/register"
                                }
                                className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white shadow-lg shadow-blue-200 transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-blue-700"
                            >

                                {
                                    token
                                        ? "Start Creating 🚀"
                                        : "Get Started Free 🚀"
                                }

                            </Link>


                            <button
                                onClick={scrollToFeatures}
                                className="rounded-lg border border-gray-300 bg-white px-8 py-3 font-medium shadow-sm transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-gray-100"
                            >

                                Learn More

                            </button>


                        </div>


                        {/* QUICK FEATURES */}

                        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-500">


                            <span className="flex items-center gap-1">

                                <Check
                                    size={15}
                                    className="text-green-600"
                                />

                                Brand profile memory

                            </span>


                            <span className="flex items-center gap-1">

                                <Check
                                    size={15}
                                    className="text-green-600"
                                />

                                Image understanding

                            </span>


                            <span className="flex items-center gap-1">

                                <Check
                                    size={15}
                                    className="text-green-600"
                                />

                                SEO & tone analysis

                            </span>


                        </div>


                    </div>



                    {/* =================================================
                        UPDATED GENERATOR PREVIEW
                    ================================================= */}

                    <div className="home-float">


                        <div className="rounded-3xl border border-white bg-white/90 p-7 shadow-2xl backdrop-blur transition duration-500 hover:shadow-blue-200">


                            {/* PREVIEW HEADER */}

                            <div className="mb-5 flex items-center justify-between">


                                <div>

                                    <div className="flex items-center gap-2 text-sm font-medium text-blue-600">

                                        <WandSparkles size={16} />

                                        BrandOS AI Generator

                                    </div>


                                    <h2 className="mt-1 text-2xl font-bold">

                                        Sunrise Coffee

                                    </h2>

                                </div>


                                <span className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">

                                    <span className="h-2 w-2 rounded-full bg-green-500" />

                                    Ready

                                </span>


                            </div>



                            {/* GENERATOR DETAILS */}

                            <div className="space-y-3">


                                {/* CONTENT TYPE */}

                                <div className="rounded-xl bg-gray-50 p-4 transition duration-300 hover:bg-blue-50">

                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">

                                        Content Type

                                    </p>


                                    <p className="mt-1 font-semibold text-gray-800">

                                        Social Media Caption

                                    </p>

                                </div>



                                {/* TOPIC */}

                                <div className="rounded-xl bg-gray-50 p-4 transition duration-300 hover:bg-blue-50">

                                    <div className="flex items-center gap-2">

                                        <MessageSquareText
                                            size={16}
                                            className="text-blue-600"
                                        />

                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">

                                            Topic / Instructions

                                        </p>

                                    </div>


                                    <p className="mt-2 text-sm font-medium text-gray-700">

                                        Promote our new strawberry matcha for Instagram.

                                    </p>

                                </div>



                                {/* IMAGE + BRAND TONE */}

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">


                                    {/* IMAGE */}

                                    <div className="rounded-xl border border-dashed border-blue-200 bg-blue-50/50 p-4">

                                        <div className="flex items-center gap-2 text-blue-600">

                                            <Image size={17} />

                                            <p className="text-xs font-semibold uppercase tracking-wide">

                                                Product Image

                                            </p>

                                        </div>


                                        <div className="mt-3 flex items-center gap-3">

                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-100 to-pink-100">

                                                <span className="text-2xl">
                                                    🍵
                                                </span>

                                            </div>


                                            <div>

                                                <p className="text-sm font-semibold text-gray-800">

                                                    matcha.jpg

                                                </p>


                                                <p className="text-xs text-green-600">

                                                    ✓ Image understood

                                                </p>

                                            </div>

                                        </div>

                                    </div>



                                    {/* BRAND CONTEXT */}

                                    <div className="rounded-xl bg-purple-50/70 p-4">

                                        <div className="flex items-center gap-2 text-purple-600">

                                            <Brain size={17} />

                                            <p className="text-xs font-semibold uppercase tracking-wide">

                                                Brand Context

                                            </p>

                                        </div>


                                        <p className="mt-3 text-sm font-semibold text-gray-800">

                                            Friendly

                                        </p>


                                        <p className="mt-1 text-xs text-purple-600">

                                            ✓ Profile applied

                                        </p>

                                    </div>


                                </div>



                                {/* GENERATED RESULT */}

                                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">


                                    <div className="mb-3 flex items-center justify-between">

                                        <p className="font-semibold">

                                            Generated Preview

                                        </p>


                                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">

                                            AI Generated

                                        </span>

                                    </div>


                                    <p className="text-sm leading-relaxed text-gray-600">

                                        Strawberry season just got a little
                                        sweeter. 🍓🍵 Meet our creamy strawberry
                                        matcha — fresh, vibrant and made for your
                                        next coffee break.

                                    </p>


                                    <div className="mt-4 flex flex-wrap gap-2">


                                        <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">

                                            Brand matched

                                        </span>


                                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">

                                            Image analysed

                                        </span>


                                    </div>


                                </div>



                                {/* PROGRESS */}

                                <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                                    <div className="home-progress h-full rounded-full bg-blue-600" />

                                </div>


                            </div>


                        </div>


                    </div>


                </div>


            </section>



            {/* =====================================================
                FEATURES
            ===================================================== */}

            <section
                id="features"
                className="bg-white px-6 py-24"
            >


                <div className="mx-auto max-w-6xl">


                    <div className="mx-auto max-w-2xl text-center">


                        <p className="font-medium text-blue-600">

                            Everything in one place

                        </p>


                        <h2 className="mt-2 text-4xl font-bold">

                            Powerful AI tools for your brand

                        </h2>


                        <p className="mt-4 leading-relaxed text-gray-600">

                            Give BrandOS your business context, an idea or
                            product image and turn it into marketing content
                            you can analyse, edit and manage.

                        </p>


                    </div>



                    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">


                        {/* AI GENERATOR */}

                        <div className="home-feature-card rounded-2xl border bg-gray-50 p-6">

                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                                <Sparkles size={24} />

                            </div>


                            <h3 className="text-xl font-bold">

                                AI Content Generator

                            </h3>


                            <p className="mt-2 text-gray-600">

                                Generate blog posts, social captions and
                                email campaigns using your saved business
                                profile and brand voice.

                            </p>

                        </div>



                        {/* IMAGE UNDERSTANDING */}

                        <div className="home-feature-card rounded-2xl border bg-gray-50 p-6">

                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">

                                <Image size={24} />

                            </div>


                            <h3 className="text-xl font-bold">

                                Image-Aware Generation

                            </h3>


                            <p className="mt-2 text-gray-600">

                                Upload a product or promotional image and
                                let AI understand the visual when creating
                                your marketing content.

                            </p>

                        </div>



                        {/* BRAND MEMORY */}

                        <div className="home-feature-card rounded-2xl border bg-gray-50 p-6">

                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">

                                <Brain size={24} />

                            </div>


                            <h3 className="text-xl font-bold">

                                Brand Profile Memory

                            </h3>


                            <p className="mt-2 text-gray-600">

                                Reuse your business name, industry,
                                audience and tone so generated content
                                stays aligned with your brand.

                            </p>

                        </div>



                        {/* SEO */}

                        <div className="home-feature-card rounded-2xl border bg-gray-50 p-6">

                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">

                                <Search size={24} />

                            </div>


                            <h3 className="text-xl font-bold">

                                AI SEO Analysis

                            </h3>


                            <p className="mt-2 text-gray-600">

                                Analyse generated content for SEO scores,
                                keywords and practical improvement
                                suggestions.

                            </p>

                        </div>



                        {/* TONE */}

                        <div className="home-feature-card rounded-2xl border bg-gray-50 p-6">

                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">

                                <MessageSquareText size={24} />

                            </div>


                            <h3 className="text-xl font-bold">

                                AI Tone Analysis

                            </h3>


                            <p className="mt-2 text-gray-600">

                                Detect the tone of generated content and
                                check how confidently it matches your
                                intended brand voice.

                            </p>

                        </div>



                        {/* HISTORY */}

                        <div className="home-feature-card rounded-2xl border bg-gray-50 p-6">

                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100 text-pink-600">

                                <History size={24} />

                            </div>


                            <h3 className="text-xl font-bold">

                                Content History

                            </h3>


                            <p className="mt-2 text-gray-600">

                                Save, edit, copy, analyse and manage your
                                previously generated marketing content
                                from one place.

                            </p>

                        </div>


                    </div>


                </div>


            </section>



            {/* =====================================================
                HOW IT WORKS
            ===================================================== */}

            <section className="bg-gray-50 px-6 py-24">


                <div className="mx-auto max-w-6xl">


                    <div className="mx-auto max-w-2xl text-center">


                        <p className="font-medium text-blue-600">

                            Simple workflow

                        </p>


                        <h2 className="mt-2 text-4xl font-bold">

                            From idea to content in seconds

                        </h2>


                    </div>



                    <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">


                        {/* STEP 1 */}

                        <div className="text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-lg shadow-blue-200">

                                1

                            </div>


                            <h3 className="mt-5 text-xl font-bold">

                                Set your brand

                            </h3>


                            <p className="mt-2 text-gray-600">

                                Save your business, industry, audience
                                and preferred brand tone.

                            </p>

                        </div>



                        {/* STEP 2 */}

                        <div className="text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-600 text-xl font-bold text-white shadow-lg">

                                2

                            </div>


                            <h3 className="mt-5 text-xl font-bold">

                                Give BrandOS context

                            </h3>


                            <p className="mt-2 text-gray-600">

                                Choose your content type, describe what
                                you want and optionally upload an image.

                            </p>

                        </div>



                        {/* STEP 3 */}

                        <div className="text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600 text-xl font-bold text-white shadow-lg">

                                3

                            </div>


                            <h3 className="mt-5 text-xl font-bold">

                                Generate & analyse

                            </h3>


                            <p className="mt-2 text-gray-600">

                                Generate your content, then analyse its
                                SEO and tone before using it.

                            </p>

                        </div>


                    </div>


                </div>


            </section>



            {/* =====================================================
                FINAL CTA
            ===================================================== */}

            <section className="bg-gradient-to-b from-white to-blue-50 px-6 py-24">


                <div className="home-cta relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-center text-white shadow-2xl md:p-14">


                    <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white opacity-10" />

                    <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-purple-300 opacity-20" />


                    <div className="relative z-10">


                        <h2 className="text-4xl font-bold">

                            Turn your next idea into content.

                        </h2>


                        <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">

                            Build your business profile, describe what
                            you want to promote or upload an image and
                            let BrandOS create content that understands
                            your brand.

                        </p>


                        <Link
                            to={
                                token
                                    ? "/generator"
                                    : "/register"
                            }
                            className="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-bold text-blue-600 shadow-lg transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-gray-100"
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