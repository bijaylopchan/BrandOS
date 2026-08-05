function Home() {
    return (
      <div>
  
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-50 px-6">
  
          <h1 className="text-6xl font-bold text-gray-900">
            Create Content Faster
            <span className="text-blue-600">
              {" "}with AI
            </span>
          </h1>
  
  
          <p className="mt-6 text-xl text-gray-600 max-w-2xl">
            BrandOS helps small businesses generate blogs,
            social media posts, and emails using artificial intelligence.
          </p>
  
  
          <div className="mt-8 flex gap-4">
  
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
              Start Creating
            </button>
  
  
            <button className="border border-gray-300 px-8 py-3 rounded-lg">
              Learn More
            </button>
  
          </div>
  
        </section>
  
  
        {/* Features */}
        <section className="py-16 px-8">
  
          <h2 className="text-4xl font-bold text-center">
            Powerful AI Tools
          </h2>
  
  
          <div className="grid md:grid-cols-4 gap-6 mt-10">
  
  
            <div className="p-6 shadow rounded-xl">
              <h3 className="text-xl font-bold">
                AI Generator
              </h3>
              <p>
                Create marketing content instantly.
              </p>
            </div>
  
  
            <div className="p-6 shadow rounded-xl">
              <h3 className="text-xl font-bold">
                SEO Analysis
              </h3>
              <p>
                Improve your content visibility.
              </p>
            </div>
  
  
            <div className="p-6 shadow rounded-xl">
              <h3 className="text-xl font-bold">
                Tone Analysis
              </h3>
              <p>
                Match your brand voice.
              </p>
            </div>
  
  
            <div className="p-6 shadow rounded-xl">
              <h3 className="text-xl font-bold">
                Content History
              </h3>
              <p>
                Save and manage previous content.
              </p>
            </div>
  
  
          </div>
  
        </section>
  
      </div>
    );
  }
  
  export default Home;