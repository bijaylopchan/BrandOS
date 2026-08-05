import { useEffect, useState } from "react";
import api from "../services/api";

function History() {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        fetchHistory();

    }, []);


    const fetchHistory = async () => {

        try {

            const response = await api.get(
                "/content/history",
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setHistory(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    return (

        <div>

            <h1 className="text-4xl font-bold mb-6">
                Content History
            </h1>


            {
                history.length === 0 ? (

                    <p>Your previous AI generated content will appear here.</p>

                ) : (

                    history.map((item) => (

                        <div
                            key={item.id}
                            className="bg-white shadow rounded-lg p-6 mb-4"
                        >

                            <h2 className="text-xl font-bold">
                                {item.title}
                            </h2>

                            <p className="text-gray-500 mb-3">
                                {item.type}
                            </p>

                            <p>
                                {item.body}
                            </p>

                        </div>

                    ))

                )

            }

        </div>

    );

}

export default History;