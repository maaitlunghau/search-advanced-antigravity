export default async function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-slate-50 pt-20 sm:pt-32 pb-32 sm:pb-48 px-4 border-b border-slate-200 overflow-visible z-10">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Soft background accents */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-100 opacity-50 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Learn without limits
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed">
            Start, switch, or advance your career with more than 5,000 courses, Professional Certificates, and degrees from world-class universities and companies.
          </p>
          <div className="flex justify-center gap-4 pt-6">
             <button className="bg-blue-600 text-white px-8 py-4 rounded-md hover:bg-blue-700 transition-all font-bold text-lg shadow-lg shadow-blue-200">
               Join for Free
             </button>
             <button className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-md hover:bg-blue-50 transition-all font-bold text-lg">
               Try for Business
             </button>
          </div>
        </div>
      </div>

      {/* Featured Logos/Trust section */}
      <div className="py-20 mt-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-12">
                Trusted by 300+ leading universities and companies
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Dummy logos */}
                <span className="text-2xl font-bold font-serif text-slate-700">Stanford</span>
                <span className="text-2xl font-bold font-sans text-slate-700 underline decoration-blue-500 underline-offset-4">Google</span>
                <span className="text-2xl font-bold font-serif text-slate-700">Penn</span>
                <span className="text-2xl font-bold font-sans tracking-tight text-slate-700">IBM</span>
                <span className="text-2xl font-bold font-sans text-slate-700 tracking-tighter">meta</span>
            </div>
        </div>
      </div>

      <footer className="py-8 border-t border-slate-100 bg-slate-50 text-center">
          <p className="text-sm text-slate-400">© 2024 Coursera Clone. All rights reserved.</p>
      </footer>
    </div>
  );
}
