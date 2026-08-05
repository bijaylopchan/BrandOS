function Dashboard() {


    return (
  
      <div>
  
  
        <h1 className="text-3xl font-bold mb-2">
          Dashboard
        </h1>
  
  
        <p className="text-gray-600 mb-8">
          Welcome back to BrandOS 🚀
        </p>
  
  
  
        <div className="grid grid-cols-3 gap-6">
  
  
          <div className="bg-white p-6 rounded-xl shadow">
  
            <h2 className="text-gray-500">
              Total Content
            </h2>
  
            <p className="text-3xl font-bold">
              24
            </p>
  
          </div>
  
  
  
          <div className="bg-white p-6 rounded-xl shadow">
  
            <h2 className="text-gray-500">
              AI Credits
            </h2>
  
            <p className="text-3xl font-bold">
              150
            </p>
  
          </div>
  
  
  
          <div className="bg-white p-6 rounded-xl shadow">
  
            <h2 className="text-gray-500">
              Saved Content
            </h2>
  
            <p className="text-3xl font-bold">
              12
            </p>
  
          </div>
  
  
        </div>
  
  
  
  
        <div className="bg-white p-6 rounded-xl shadow mt-8">
  
  
          <h2 className="text-xl font-bold mb-4">
            Recent Content
          </h2>
  
  
          <div className="space-y-3">
  
  
            <div>
              Blog Post - Coffee Shop Marketing Ideas
            </div>
  
  
            <div>
              Instagram Caption - Product Launch
            </div>
  
  
            <div>
              Email Campaign - Customer Newsletter
            </div>
  
  
          </div>
  
  
        </div>
  
  
      </div>
  
    );
  
  }
  
  
  export default Dashboard;