import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";


function Navbar() {


  const { token, logout } = useAuth();


  return (

    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">


      <Link
        to="/"
        className="text-2xl font-bold text-blue-600"
      >
        BrandOS
      </Link>



      <div className="flex gap-6">


        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600"
        >
          Home
        </Link>



        {token ? (

          <>


            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>


            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>


          </>


        ) : (

          <>


            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600"
            >
              Login
            </Link>


            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Get Started
            </Link>


          </>

        )}


      </div>


    </nav>

  );

}


export default Navbar;