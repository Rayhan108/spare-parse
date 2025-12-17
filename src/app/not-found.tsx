import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
      
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl animate-bounce opacity-10">⚙️</div>
        <div className="absolute top-40 right-20 text-5xl animate-pulse opacity-10">🔧</div>
        <div className="absolute bottom-32 left-20 text-4xl animate-bounce opacity-10" style={{animationDelay: '0.5s'}}>🛞</div>
        <div className="absolute top-60 right-40 text-5xl animate-pulse opacity-10">🔩</div>
        <div className="absolute bottom-40 right-10 text-6xl animate-bounce opacity-10" style={{animationDelay: '1s'}}>⛽</div>
      </div>

      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gray-800 border-t-4 border-gray-600">
        <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 border-t-4 border-dashed border-yellow-400"></div>
      </div>

      {/* Main Content */}
      <div className="text-center z-10">
        
        {/* Car Illustration */}
        <div className="relative w-72 h-40 mx-auto mb-8">
          
          {/* Smoke */}
          <div className="absolute -top-2 left-6">
            <div className="w-4 h-4 bg-gray-400 rounded-full animate-ping opacity-60"></div>
          </div>
          <div className="absolute -top-4 left-10">
            <div className="w-3 h-3 bg-gray-300 rounded-full animate-ping opacity-40" style={{animationDelay: '0.3s'}}></div>
          </div>
          <div className="absolute -top-1 left-14">
            <div className="w-2 h-2 bg-gray-200 rounded-full animate-ping opacity-30" style={{animationDelay: '0.6s'}}></div>
          </div>

          {/* Car Body */}
          <div className="absolute bottom-12 left-4 w-64 h-14 bg-gradient-to-b from-red-500 to-red-700 rounded-lg shadow-2xl">
            {/* Front light */}
            <div className="absolute left-2 top-4 w-4 h-3 bg-yellow-300 rounded-sm animate-pulse"></div>
            {/* Back light */}
            <div className="absolute right-2 top-4 w-4 h-3 bg-red-400 rounded-sm animate-pulse"></div>
          </div>

          {/* Car Top/Cabin */}
          <div className="absolute bottom-24 left-16 w-40 h-12 bg-gradient-to-b from-red-500 to-red-600 rounded-t-2xl">
            {/* Windows */}
            <div className="absolute top-2 left-3 w-14 h-7 bg-sky-300/70 rounded-sm"></div>
            <div className="absolute top-2 right-3 w-14 h-7 bg-sky-300/70 rounded-sm"></div>
          </div>

          {/* Wheels */}
          <div className="absolute bottom-4 left-8 w-14 h-14 bg-gray-800 rounded-full border-4 border-gray-500 animate-spin shadow-lg" style={{animationDuration: '3s'}}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
            </div>
          </div>
          
          <div className="absolute bottom-4 right-8 w-14 h-14 bg-gray-800 rounded-full border-4 border-gray-500 shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          {/* Fallen/Rolling Wheel */}
          <div className="absolute -bottom-2 -right-8 w-12 h-12 bg-gray-800 rounded-full border-4 border-gray-500 animate-spin">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          {/* Warning Triangle */}
          <div className="absolute -top-6 right-0 text-4xl animate-bounce">⚠️</div>
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent drop-shadow-lg mb-4">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest mb-4">
          Part Not Found!
        </h2>

        <p className="text-gray-400 text-lg max-w-md mx-auto mb-8 leading-relaxed px-4">
          Oops! Looks like this page broke down on the highway. 
          The part you&apos;re looking for might have rolled away! 🛞
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link 
            href="/" 
            className="flex items-center gap-2 px-8 py-4  from-orange-500 to-red-500 text-white font-bold rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
          >
           <span className="text-white"> 🏠 Back to Home</span>
          </Link>
          <Link 
            href="/shop" 
            className="flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full bg-white hover:text-gray-900 transition-all duration-300"
          >
          <span className="text-white">  🛒 Browse Parts</span>
          </Link>
        </div>

     
      </div>
    </div>
  );
};

export default NotFound;