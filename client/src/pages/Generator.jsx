import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import {
    ImagePlus,
    X,
    UploadCloud
} from "lucide-react";

import api from "../services/api";


function Generator() {

    const [formData, setFormData] = useState({
        contentType: "Blog Post",
        topic: ""
    });

    const [generatedContent, setGeneratedContent] = useState("");
    const [businessProfile, setBusinessProfile] = useState(null);

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const fileInputRef = useRef(null);


    useEffect(() => {

        loadBusinessProfile();

    }, []);


    useEffect(() => {

        return () => {

            if (imagePreview) {

                URL.revokeObjectURL(
                    imagePreview
                );

            }

        };

    }, [imagePreview]);


    const loadBusinessProfile = async () => {

        try {

            const response = await api.get(
                "/business"
            );


            setBusinessProfile(
                response.data
            );


        } catch (error) {

            console.log(error);


            setErrorMessage(
                "Failed to load your business profile."
            );

        }

    };


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });

    };


    const handleImageChange = (e) => {

        const file =
            e.target.files?.[0];


        if (!file) {
            return;
        }


        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];


        if (!allowedTypes.includes(file.type)) {

            setErrorMessage(
                "Please upload a JPG, PNG or WEBP image."
            );

            e.target.value = "";

            return;

        }


        if (file.size > 5 * 1024 * 1024) {

            setErrorMessage(
                "Image must be smaller than 5 MB."
            );

            e.target.value = "";

            return;

        }


        if (imagePreview) {

            URL.revokeObjectURL(
                imagePreview
            );

        }


        const previewUrl =
            URL.createObjectURL(file);


        setImageFile(file);

        setImagePreview(
            previewUrl
        );

        setErrorMessage("");

    };


    const removeImage = () => {

        if (imagePreview) {

            URL.revokeObjectURL(
                imagePreview
            );

        }


        setImageFile(null);

        setImagePreview("");


        if (fileInputRef.current) {

            fileInputRef.current.value = "";

        }

    };


    const handleGenerate = async () => {

        if (!businessProfile) {
            return;
        }


        if (
            !formData.topic.trim() &&
            !imageFile
        ) {

            setErrorMessage(
                "Add a topic or upload a photo before generating content."
            );

            return;

        }


        try {

            setLoading(true);

            setErrorMessage("");

            setSuccessMessage("");


            const requestData =
                new FormData();


            requestData.append(
                "businessName",
                businessProfile.businessName || ""
            );


            requestData.append(
                "industry",
                businessProfile.industry || ""
            );


            requestData.append(
                "audience",
                businessProfile.audience || ""
            );


            requestData.append(
                "contentType",
                formData.contentType
            );


            requestData.append(
                "tone",
                businessProfile.tone || ""
            );


            requestData.append(
                "topic",
                formData.topic
            );


            if (imageFile) {

                requestData.append(
                    "image",
                    imageFile
                );

            }


            const response =
                await api.post(
                    "/content/generate",
                    requestData
                );


            setGeneratedContent(
                response.data.content
            );


            setSuccessMessage(
                "Content generated successfully."
            );


        } catch (error) {

            console.log(error);


            setErrorMessage(
                error.response?.data?.message ||
                "Failed to generate content. Please try again."
            );


        } finally {

            setLoading(false);

        }

    };


    const handleCopy = async () => {

        if (!generatedContent) {
            return;
        }


        try {

            await navigator.clipboard.writeText(
                generatedContent
            );


            setErrorMessage("");


            setSuccessMessage(
                "Content copied to your clipboard."
            );


        } catch (error) {

            console.log(error);


            setSuccessMessage("");


            setErrorMessage(
                "Failed to copy the content."
            );

        }

    };


    return (

        <div>

            <h1 className="mb-2 text-3xl font-bold">
                AI Content Generator
            </h1>

            <p className="mb-8 text-gray-600">
                Create marketing content using your brand profile, topic and optional product photo.
            </p>


            {
                errorMessage && (

                    <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">

                        {errorMessage}

                    </div>

                )
            }


            {
                successMessage && (

                    <div className="mb-6 rounded-lg bg-green-100 p-4 text-green-700">

                        {successMessage}

                    </div>

                )
            }


            <div className="rounded-xl bg-white p-8 shadow">


                {/* BUSINESS PROFILE */}

                {
                    businessProfile ? (

                        <div className="mb-6 rounded-lg bg-gray-100 p-4">

                            <h2 className="mb-2 text-lg font-bold">
                                Business Profile
                            </h2>

                            <p className="font-medium">
                                {businessProfile.businessName}
                            </p>

                            <p>
                                Industry: {businessProfile.industry}
                            </p>

                            <p>
                                Audience: {businessProfile.audience}
                            </p>

                            <p>
                                Tone: {businessProfile.tone}
                            </p>

                        </div>

                    ) : (

                        <div className="mb-6 rounded-lg bg-gray-100 p-4">

                            <p className="text-gray-600">
                                Loading business profile...
                            </p>

                        </div>

                    )
                }


                {/* CONTENT TYPE */}

                <div className="mb-6">

                    <label className="mb-2 block font-medium">
                        Content Type
                    </label>

                    <select
                        name="contentType"
                        value={formData.contentType}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                    >

                        <option>
                            Blog Post
                        </option>

                        <option>
                            Social Media Caption
                        </option>

                        <option>
                            Email Campaign
                        </option>

                    </select>

                </div>


                {/* TOPIC */}

                <div className="mb-6">

                    <label className="mb-2 block font-medium">
                        What would you like to create content about?
                    </label>

                    <textarea
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        disabled={loading}
                        rows="5"
                        placeholder="Example: Promote our new strawberry matcha for Instagram. It is made with ceremonial-grade matcha, strawberry puree and oat milk and is available this weekend."
                        className="w-full resize-none rounded-xl border border-gray-300 p-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                    />

                    <p className="mt-2 text-sm text-gray-500">
                        Tell BrandOS about the product, event, promotion, announcement or idea you want to post about.
                    </p>

                </div>


                {/* IMAGE UPLOAD */}

                <div className="mb-7">

                    <div className="mb-2 flex items-center justify-between gap-4">

                        <label className="font-medium">
                            Add a photo
                            <span className="ml-2 text-sm font-normal text-gray-400">
                                Optional
                            </span>
                        </label>

                        {
                            imageFile && (

                                <span className="text-xs text-gray-400">
                                    {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                                </span>

                            )
                        }

                    </div>


                    {
                        imagePreview ? (

                            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">

                                <img
                                    src={imagePreview}
                                    alt="Upload preview"
                                    className="max-h-[420px] w-full object-contain"
                                />


                                <button
                                    type="button"
                                    onClick={removeImage}
                                    disabled={loading}
                                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white shadow-lg transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                                    title="Remove image"
                                >
                                    <X size={18} />
                                </button>


                                <div className="border-t border-gray-200 bg-white px-4 py-3">

                                    <p className="truncate text-sm font-medium text-gray-700">
                                        {imageFile?.name}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-400">
                                        OpenAI will use this image only to understand what your content should be about.
                                    </p>

                                </div>

                            </div>

                        ) : (

                            <button
                                type="button"
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                                disabled={loading}
                                className="group flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center transition hover:border-blue-400 hover:bg-blue-50/50 disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition group-hover:scale-105">

                                    <ImagePlus size={27} />

                                </div>


                                <p className="font-semibold text-gray-800">
                                    Upload a product or content photo
                                </p>


                                <p className="mt-2 max-w-md text-sm text-gray-500">
                                    BrandOS can inspect the photo and use visible details when creating your caption, blog post or email.
                                </p>


                                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600">

                                    <UploadCloud size={17} />

                                    Choose image

                                </div>


                                <p className="mt-3 text-xs text-gray-400">
                                    JPG, PNG or WEBP · Maximum 5 MB
                                </p>

                            </button>

                        )
                    }


                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageChange}
                        className="hidden"
                    />

                </div>


                {/* GENERATE BUTTON */}

                <button
                    onClick={handleGenerate}
                    disabled={
                        !businessProfile ||
                        loading ||
                        (
                            !formData.topic.trim() &&
                            !imageFile
                        )
                    }
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-4 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                >

                    {
                        loading
                            ? "Generating Content..."
                            : imageFile
                                ? "Generate Content From Photo 🚀"
                                : "Generate Content 🚀"
                    }

                </button>

            </div>


            {/* GENERATED CONTENT */}

            <div className="mt-8 rounded-xl bg-white p-8 shadow">

                <h2 className="mb-4 text-xl font-bold">
                    Generated Content
                </h2>


                {
                    loading ? (

                        <div className="rounded-xl bg-blue-50 p-5">

                            <p className="font-medium text-blue-700">
                                BrandOS is creating your content...
                            </p>

                            <p className="mt-1 text-sm text-blue-500">
                                {
                                    imageFile
                                        ? "Analyzing your photo and applying your saved brand profile."
                                        : "Applying your saved brand profile and content instructions."
                                }
                            </p>

                        </div>

                    ) : generatedContent ? (

                        <div className="max-w-none text-gray-700">

                            <ReactMarkdown
                                components={{

                                    h1: ({ children }) => (
                                        <h1 className="mb-4 mt-6 text-3xl font-bold text-gray-900">
                                            {children}
                                        </h1>
                                    ),

                                    h2: ({ children }) => (
                                        <h2 className="mb-3 mt-6 text-2xl font-bold text-gray-900">
                                            {children}
                                        </h2>
                                    ),

                                    h3: ({ children }) => (
                                        <h3 className="mb-2 mt-5 text-xl font-bold text-gray-900">
                                            {children}
                                        </h3>
                                    ),

                                    p: ({ children }) => (
                                        <p className="mb-4 leading-7">
                                            {children}
                                        </p>
                                    ),

                                    ul: ({ children }) => (
                                        <ul className="mb-4 list-disc space-y-2 pl-6">
                                            {children}
                                        </ul>
                                    ),

                                    ol: ({ children }) => (
                                        <ol className="mb-4 list-decimal space-y-2 pl-6">
                                            {children}
                                        </ol>
                                    ),

                                    li: ({ children }) => (
                                        <li className="leading-7">
                                            {children}
                                        </li>
                                    ),

                                    strong: ({ children }) => (
                                        <strong className="font-bold text-gray-900">
                                            {children}
                                        </strong>
                                    ),

                                    em: ({ children }) => (
                                        <em className="italic">
                                            {children}
                                        </em>
                                    )

                                }}
                            >

                                {generatedContent}

                            </ReactMarkdown>

                        </div>

                    ) : (

                        <p className="text-gray-500">
                            AI output will appear here...
                        </p>

                    )
                }


                {
                    generatedContent &&
                    !loading && (

                        <div className="mt-6 flex flex-wrap gap-3">

                            <button
                                onClick={handleCopy}
                                className="rounded-lg bg-gray-700 px-5 py-2 text-white transition hover:bg-gray-800"
                            >
                                Copy Content
                            </button>


                            <button
                                onClick={handleGenerate}
                                className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
                            >
                                Regenerate
                            </button>

                        </div>

                    )
                }

            </div>

        </div>

    );

}


export default Generator;