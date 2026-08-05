import { useEffect, useState } from "react";
import api from "../services/api";


function Dashboard() {


    const [stats, setStats] = useState({

        total: 0,
        blogPosts: 0,
        socialPosts: 0,
        emails: 0

    });




    useEffect(() => {

        fetchStats();

    }, []);






    const fetchStats = async () => {


        try {


            const response = await api.get(

                "/content/stats"

            );


            setStats(response.data);



        } catch(error) {


            console.log(error);


        }


    };






    return (

        <div>



            <h1 className="text-4xl font-bold mb-6">

                Dashboard

            </h1>




            <p className="mb-8 text-gray-600">

                Welcome back to BrandOS 👋

            </p>






            <div className="grid grid-cols-4 gap-6">



                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-gray-500">

                        Total Content

                    </h2>


                    <p className="text-3xl font-bold">

                        {stats.total}

                    </p>


                </div>






                <div className="bg-white p-6 rounded-xl shadow">


                    <h2 className="text-gray-500">

                        Blog Posts

                    </h2>


                    <p className="text-3xl font-bold">

                        {stats.blogPosts}

                    </p>


                </div>






                <div className="bg-white p-6 rounded-xl shadow">


                    <h2 className="text-gray-500">

                        Social Posts

                    </h2>


                    <p className="text-3xl font-bold">

                        {stats.socialPosts}

                    </p>


                </div>






                <div className="bg-white p-6 rounded-xl shadow">


                    <h2 className="text-gray-500">

                        Emails

                    </h2>


                    <p className="text-3xl font-bold">

                        {stats.emails}

                    </p>


                </div>




            </div>





        </div>

    );


}


export default Dashboard;