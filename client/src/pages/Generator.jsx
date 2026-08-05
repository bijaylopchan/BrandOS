import { useEffect, useState } from "react";
import api from "../services/api";


function Generator() {

    const [formData, setFormData] = useState({
        contentType: "Blog Post"
    });

    const [generatedContent, setGeneratedContent] = useState("");
    const [businessProfile, setBusinessProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    useEffect(() => {
        loadBusinessProfile();
    }, []);


    const loadBusinessProfile = async () => {

        try {

            const response = await api.get("/business");

            setBusinessProfile(response.data);

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
            [e.target.name]: e.target.value
        });

    };


    const handleGenerate = async () => {

        if (!businessProfile) {
            return;
        }

        try {

            setLoading(true);
            setErrorMessage("");
            setSuccessMessage("");

            const response = await api.post(
                "/content/generate",
                {
                    businessName: businessProfile.businessName,
                    industry: businessProfile.industry,
                    audience: businessProfile.audience,
                    contentType: formData.contentType,
                    tone: businessProfile.tone
                }
            );

            setGeneratedContent(response.data.content);

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

            <h1 className="text-3xl font-bold mb-2">
                AI Content Generator
            </h1>

            <p className="text-gray-600 mb-8">
                Create marketing content using AI.
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


            <div className="bg-white p-8 rounded-xl shadow">

                {
                    businessProfile ? (

                        <div className="mb-6 bg-gray-100 p-4 rounded-lg">

                            <h2 className="font-bold text-lg mb-2">
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

                        <div className="mb-6 bg-gray-100 p-4 rounded-lg">

                            <p className="text-gray-600">
                                Loading business profile...
                            </p>

                        </div>

                    )
                }


                <div className="mb-5">

                    <label className="block mb-2 font-medium">
                        Content Type
                    </label>

                    <select
                        name="contentType"
                        value={formData.contentType}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full border p-3 rounded-lg disabled:bg-gray-100"
                    >

                        <option>Blog Post</option>
                        <option>Social Media Caption</option>
                        <option>Email Campaign</option>

                    </select>

                </div>


                <button
                    onClick={handleGenerate}
                    disabled={!businessProfile || loading}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {
                        loading
                            ? "Generating Content..."
                            : "Generate Content 🚀"
                    }
                </button>

            </div>


            <div className="bg-white p-8 rounded-xl shadow mt-8">

                <h2 className="text-xl font-bold mb-4">
                    Generated Content
                </h2>

                <div className="text-gray-700 whitespace-pre-line">

                    {
                        loading
                            ? "Generating AI content..."
                            : generatedContent ||
                              "AI output will appear here..."
                    }

                </div>


                {
                    generatedContent && !loading && (

                        <div className="flex flex-wrap gap-3 mt-6">

                            <button
                                onClick={handleCopy}
                                className="bg-gray-700 text-white px-5 py-2 rounded-lg"
                            >
                                Copy Content
                            </button>

                            <button
                                onClick={handleGenerate}
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
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