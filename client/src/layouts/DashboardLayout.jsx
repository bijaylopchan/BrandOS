import { Link } from "react-router-dom";


function DashboardLayout({ children }) {


  return (

    <div className="flex min-h-screen bg-gray-100">


      <aside className="w-64 bg-white shadow p-6">


        <h2 className="text-xl font-bold text-blue-600 mb-8">
          BrandOS
        </h2>


        <nav className="flex flex-col gap-4">


          <Link to="/dashboard">
            Dashboard
          </Link>


          <Link to="/generator">
            AI Generator
          </Link>


          <Link to="/history">
            History
          </Link>

          <Link to="/business-profile">
            Business Profile
          </Link>


          <Link to="/analytics">
            Analytics
          </Link>


          <Link to="/settings">
            Settings
          </Link>


        </nav>


      </aside>



      <main className="flex-1 p-8">


        {children}


      </main>


    </div>

  );

}


export default DashboardLayout;