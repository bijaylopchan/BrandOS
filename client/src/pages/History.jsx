import { useEffect, useState } from "react";
import api from "../services/api";


function History() {


    const [history, setHistory] = useState([]);

    const [seoResults, setSeoResults] = useState({});
    
    const [toneResults, setToneResults] = useState({});

    const [editingId, setEditingId] = useState(null);

    const [editText, setEditText] = useState("");




    useEffect(() => {

        fetchHistory();

    }, []);





    const fetchHistory = async () => {

        try {

            const response = await api.get(
                "/content/history"
            );

            setHistory(response.data);


        } catch(error) {

            console.log(error);

        }

    };






    const startEdit = (item) => {

        setEditingId(item.id);

        setEditText(item.body);

    };






    const saveEdit = async (id) => {

        try {


            await api.put(

                `/content/${id}`,

                {
                    body: editText
                }

            );


            setEditingId(null);

            fetchHistory();



        } catch(error) {

            console.log(error);

        }

    };






    const deleteContent = async (id) => {

        try {


            await api.delete(

                `/content/${id}`

            );


            fetchHistory();



        } catch(error) {


            console.log(error);


        }

    };







    const analyzeSEO = async (id) => {

        try {


            const response = await api.post(

                `/content/${id}/seo`

            );


            setSeoResults({

                ...seoResults,

                [id]: response.data

            });



        } catch(error) {


            console.log(error);


        }

    };

    const analyzeTone = async (id) => {

      try {
  
  
          const response = await api.post(
  
              `/content/${id}/tone`
  
          );
  
  
  
          setToneResults({
  
              ...toneResults,
  
              [id]: response.data
  
          });
  
  
  
      } catch(error) {
  
  
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

                    <p>
                        Your previous AI generated content will appear here.
                    </p>


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





                            {
                                editingId === item.id ? (


                                    <textarea

                                        value={editText}

                                        onChange={(e) =>
                                            setEditText(e.target.value)
                                        }

                                        className="w-full border p-3 rounded-lg"

                                        rows="6"

                                    />


                                ) : (


                                    <div>


                                        <p>

                                            {item.body}

                                        </p>




                                        {
                                            seoResults[item.id] && (

                                                <div className="mt-4 bg-gray-100 p-4 rounded-lg">


                                                    <h3 className="font-bold">

                                                        SEO Analysis

                                                    </h3>



                                                    <p>

                                                        Score: {seoResults[item.id].score}/100

                                                    </p>



                                                    <p>

                                                        Keywords: {seoResults[item.id].keywords}

                                                    </p>



                                                    <p>

                                                        Suggestions: {seoResults[item.id].suggestions}

                                                    </p>



                                                </div>

                                            )
                                        }
                                        {
                                          toneResults[item.id] && (
                                            <div className="mt-4 bg-yellow-100 p-4 rounded-lg">

                                              <h3 className="font-bold">

                                              Tone Analysis

                                              </h3>
                                              <p>
                                              Tone: {toneResults[item.id].tone}
                                              </p>
                                              <p>
                                              Confidence: {toneResults[item.id].confidence}%
                                              </p>
                                              </div>
                                          )
                                        }


                                    </div>


                                )
                            }







                            {
                                editingId === item.id ? (


                                    <button

                                        onClick={() => saveEdit(item.id)}

                                        className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg"

                                    >

                                        Save Changes

                                    </button>


                                ) : (


                                    <div className="flex gap-3 mt-4">



                                        <button

                                            onClick={() => startEdit(item)}

                                            className="bg-blue-600 text-white px-5 py-2 rounded-lg"

                                        >

                                            Edit

                                        </button>





                                        <button

                                            onClick={() => deleteContent(item.id)}

                                            className="bg-red-600 text-white px-5 py-2 rounded-lg"

                                        >

                                            Delete

                                        </button>





                                        <button

                                            onClick={() => analyzeSEO(item.id)}

                                            className="bg-purple-600 text-white px-5 py-2 rounded-lg"

                                        >

                                            Analyze SEO

                                        </button>

                                        <button

                                            onClick={() => analyzeTone(item.id)}

                                            className="bg-orange-600 text-white px-5 py-2 rounded-lg"

                                        >


                                            Analyze Tone

                                         </button>



                                    </div>


                                )
                            }





                        </div>


                    ))


                )

            }




        </div>

    );


}


export default History;