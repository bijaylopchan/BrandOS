import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext.jsx";


function Login() {

    const { login } = useAuth();


  const [formData, setFormData] = useState({
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
        "/auth/login",
        formData
      );


      console.log(response.data);


      // Save JWT token
      login(response.data.token);


      setMessage("Login successful 🚀");


    } catch(error) {

      console.log(error.response?.data);


      setMessage(
        error.response?.data?.message || "Login failed"
      );

    }

  };


  return (

    <div>

      <h1>Login Page</h1>

      <p>Welcome back to BrandOS.</p>


      <form onSubmit={handleSubmit}>


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
            placeholder="Enter your password"
            required
          />

        </div>



        <button type="submit">
          Login
        </button>


      </form>


      <p>
        {message}
      </p>


    </div>

  );

}


export default Login;