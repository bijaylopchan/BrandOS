import { useState } from "react";
import api from "../services/api";


function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });


  const [message, setMessage] = useState("");


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "/auth/register",
        formData
      );


      console.log(response.data);

      setMessage("Account created successfully 🚀");


      setFormData({
        name: "",
        email: "",
        password: ""
      });


    } catch (error) {

      console.log(error.response?.data);

      setMessage(
        error.response?.data?.message || "Registration failed"
      );

    }

  };


  return (

    <div>

      <h1>Register Page</h1>

      <p>Create your BrandOS account.</p>


      <form onSubmit={handleSubmit}>


        <div>

          <label>Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

        </div>



        <div>

          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

        </div>



        <div>

          <label>Password</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />

        </div>



        <button type="submit">
          Register
        </button>


      </form>


      <p>
        {message}
      </p>


    </div>

  );

}


export default Register;