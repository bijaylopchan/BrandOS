import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-6">

      <h2 className="text-2xl font-bold mb-8">
        BrandOS
      </h2>


      <nav className="space-y-4">

        <Link 
          to="/dashboard"
          className="block hover:text-blue-400"
        >
          Dashboard
        </Link>


        <Link 
          to="/generator"
          className="block hover:text-blue-400"
        >
          AI Generator
        </Link>


        <Link 
          to="/history"
          className="block hover:text-blue-400"
        >
          Content History
        </Link>


        <Link 
          to="/analytics"
          className="block hover:text-blue-400"
        >
          Analytics
        </Link>


        <Link 
          to="/settings"
          className="block hover:text-blue-400"
        >
          Settings
        </Link>


      </nav>

    </aside>
  );
}

export default Sidebar;