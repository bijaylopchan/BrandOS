import { useState } from "react";


function Settings() {


    const [notifications, setNotifications] = useState(true);




    const handleLogout = () => {

        localStorage.removeItem("token");

        window.location.href = "/login";

    };





    return (

        <div>


            <h1 className="text-4xl font-bold mb-6">

                Settings

            </h1>


            <p className="text-gray-600 mb-8">

                Manage your BrandOS account and preferences.

            </p>






            <div className="bg-white rounded-xl shadow p-8 mb-6">


                <h2 className="text-xl font-bold mb-4">

                    Account Information

                </h2>



                <div className="space-y-3">


                    <div>

                        <p className="text-gray-500">

                            Name

                        </p>

                        <p className="font-medium">

                            BrandOS User

                        </p>

                    </div>




                    <div>

                        <p className="text-gray-500">

                            Email

                        </p>

                        <p className="font-medium">

                            Your registered email

                        </p>

                    </div>


                </div>



            </div>









            <div className="bg-white rounded-xl shadow p-8 mb-6">


                <h2 className="text-xl font-bold mb-4">

                    Preferences

                </h2>




                <div className="flex justify-between items-center">


                    <div>


                        <p className="font-medium">

                            Email Notifications

                        </p>


                        <p className="text-gray-500 text-sm">

                            Receive updates about your generated content.

                        </p>


                    </div>





                    <button

                        onClick={() =>
                            setNotifications(!notifications)
                        }

                        className={`px-4 py-2 rounded-lg text-white ${
                            notifications
                            ? "bg-green-600"
                            : "bg-gray-400"
                        }`}

                    >

                        {
                            notifications
                            ? "Enabled"
                            : "Disabled"
                        }


                    </button>



                </div>



            </div>









            <div className="bg-white rounded-xl shadow p-8">


                <h2 className="text-xl font-bold mb-4 text-red-600">

                    Danger Zone

                </h2>



                <p className="text-gray-600 mb-4">

                    Logout from your BrandOS account.

                </p>




                <button

                    onClick={handleLogout}

                    className="bg-red-600 text-white px-6 py-3 rounded-lg"

                >

                    Logout

                </button>



            </div>





        </div>

    );

}


export default Settings;