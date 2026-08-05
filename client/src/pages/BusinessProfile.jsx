import { useEffect, useState } from "react";
import api from "../services/api";


function BusinessProfile() {


    const [formData, setFormData] = useState({

        businessName: "",
        industry: "",
        audience: "",
        tone: ""

    });


    const [profileId, setProfileId] = useState(null);





    useEffect(() => {

        loadProfile();

    }, []);






    const loadProfile = async () => {


        try {


            const response = await api.get(
                "/business"
            );


            if(response.data) {


                setProfileId(response.data.id);


                setFormData({

                    businessName: response.data.businessName,

                    industry: response.data.industry,

                    audience: response.data.audience || "",

                    tone: response.data.tone || ""

                });


            }



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









    const handleSubmit = async (e) => {


        e.preventDefault();



        try {


            if(profileId) {


                // Update existing profile

                await api.put(

                    `/business/${profileId}`,

                    formData

                );


                alert("Business profile updated!");



            } else {


                // Create new profile

                const response = await api.post(

                    "/business",

                    formData

                );


                setProfileId(response.data.id);


                alert("Business profile created!");

            }





        } catch(error) {


            console.log(error);


        }


    };







    return (

        <div>



            <h1 className="text-4xl font-bold mb-6">

                Business Profile

            </h1>





            <div className="bg-white p-8 rounded-xl shadow">



                <form onSubmit={handleSubmit}>






                    <div className="mb-5">


                        <label className="block mb-2 font-medium">

                            Business Name

                        </label>



                        <input

                            name="businessName"

                            value={formData.businessName}

                            onChange={handleChange}

                            className="w-full border p-3 rounded-lg"

                            placeholder="Example: Sunrise Coffee"

                        />


                    </div>









                    <div className="mb-5">


                        <label className="block mb-2 font-medium">

                            Industry

                        </label>



                        <input

                            name="industry"

                            value={formData.industry}

                            onChange={handleChange}

                            className="w-full border p-3 rounded-lg"

                            placeholder="Example: Cafe"

                        />


                    </div>









                    <div className="mb-5">


                        <label className="block mb-2 font-medium">

                            Target Audience

                        </label>



                        <input

                            name="audience"

                            value={formData.audience}

                            onChange={handleChange}

                            className="w-full border p-3 rounded-lg"

                            placeholder="Example: Students and professionals"

                        />


                    </div>









                    <div className="mb-5">


                        <label className="block mb-2 font-medium">

                            Brand Tone

                        </label>



                        <select

                            name="tone"

                            value={formData.tone}

                            onChange={handleChange}

                            className="w-full border p-3 rounded-lg"

                        >



                            <option value="">

                                Select tone

                            </option>



                            <option>

                                Professional

                            </option>



                            <option>

                                Friendly

                            </option>



                            <option>

                                Funny

                            </option>



                        </select>


                    </div>








                    <button

                        className="bg-blue-600 text-white px-6 py-3 rounded-lg"

                    >


                        {
                            profileId
                            ? "Update Profile"
                            : "Save Profile"
                        }


                    </button>





                </form>



            </div>



        </div>

    );

}



export default BusinessProfile;