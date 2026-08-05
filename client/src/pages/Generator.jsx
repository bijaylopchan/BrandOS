import { useEffect, useState } from "react";
import api from "../services/api";


function Generator() {


    const [formData, setFormData] = useState({

        contentType: "Blog Post"

    });


    const [generatedContent, setGeneratedContent] = useState("");

    const [businessProfile, setBusinessProfile] = useState(null);



    useEffect(() => {

        loadBusinessProfile();

    }, []);




    const loadBusinessProfile = async () => {

        try {

            const response = await api.get("/business");

            setBusinessProfile(response.data);

            console.log(response.data);


        } catch(error) {

            console.log(error);

        }

    };




    const handleChange = (e) => {


        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });


    };





    const handleGenerate = async () => {


        try {


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


            setGeneratedContent(

                response.data.content

            );



        } catch(error) {


            console.log(error);


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




            <div className="bg-white p-8 rounded-xl shadow">



                {
                    businessProfile && (

                        <div className="mb-6 bg-gray-100 p-4 rounded-lg">


                            <h2 className="font-bold text-lg">

                                Business Profile

                            </h2>


                            <p>

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

                        className="w-full border p-3 rounded-lg"

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





                <button

                    onClick={handleGenerate}

                    disabled={!businessProfile}

                    className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:bg-gray-400"

                >

                    Generate Content 🚀

                </button>




            </div>







            <div className="bg-white p-8 rounded-xl shadow mt-8">


                <h2 className="text-xl font-bold mb-4">

                    Generated Content

                </h2>



                <p className="text-gray-700">

                    {

                        generatedContent ||

                        "AI output will appear here..."

                    }

                </p>


            </div>




        </div>

    );


}


export default Generator;