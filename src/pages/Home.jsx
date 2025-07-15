import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Make sure your API file is correct

export default function Home() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [showShimmer, setShowShimmer] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  const categories = [
    { name: "Men", image: "/newmen.jpg" },
    { name: "Women", image: "/woman.jpg" },
  ];

  useEffect(() => {
    fetchFeatured();
    
    // Shimmer loading duration
    const shimmerTimer = setTimeout(() => {
      setShowShimmer(false);
    }, 2000);

    // Parallax scrolling effect
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(shimmerTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchFeatured = async () => {
    try {
      const res = await api.get("/products?_limit=4"); // Adjust endpoint as needed
      setFeatured(res.data);
    } catch (err) {
      console.error("Error fetching featured products:", err);
    }
  };

  // Shimmer Loading Component
  const ShimmerLoader = () => (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Hero Section Shimmer */}
      <div className="w-full h-[500px] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
      
      {/* Categories Shimmer */}
      <div className="py-20 px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="text-center mb-16">
          <div className="h-10 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-lg w-64 mx-auto mb-4 animate-shimmer"></div>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 mx-auto rounded-full animate-shimmer"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {[1, 2].map((item) => (
            <div key={item} className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">
              <div className="h-64 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
              <div className="p-8 text-center">
                <div className="h-6 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-lg w-32 mx-auto mb-4 animate-shimmer"></div>
                <div className="h-10 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-full w-40 mx-auto animate-shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Shimmer */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-20 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="text-center mb-16">
          <div className="h-10 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-lg w-64 mx-auto mb-4 animate-shimmer"></div>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 mx-auto rounded-full animate-shimmer"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="h-52 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>
              <div className="p-6">
                <div className="h-5 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-lg w-32 mb-2 animate-shimmer"></div>
                <div className="h-5 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-lg w-20 mb-4 animate-shimmer"></div>
                <div className="h-10 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-full w-full animate-shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (showShimmer) {
    return <ShimmerLoader />;
  }

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen w-full overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Enhanced Banner */}
      <div className="relative w-full h-[240px] sm:h-[350px] md:h-[420px] lg:h-[500px] overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <source src="/vid3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <div className="text-white z-10 max-w-2xl animate-fade-in-up">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Step into Style with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-100 animate-gradient">
                ShoeVerse
              </span>
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-300 opacity-90 animate-fade-in-up animation-delay-300">
              Discover premium shoes for Men and Women. Trendy, affordable, and durable.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="mt-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in-up animation-delay-500 group border border-gray-700"
            >
              <span className="flex items-center gap-2">
                <span className="text-2xl group-hover:animate-bounce">🛍️</span>
                Shop Now
              </span>
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 text-4xl animate-float opacity-20">👟</div>
        <div className="absolute top-3/4 right-1/4 text-3xl animate-float-delayed opacity-20">✨</div>
      </div>

      {/* Enhanced Categories */}
      <div className="w-full py-20 px-4 sm:px-8 md:px-16 lg:px-24 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 animate-fade-in-up">
            Shop by Category
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-700 to-gray-900 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {categories.map((cat, index) => (
            <div
              key={cat.name}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 animate-fade-in-up border border-gray-200"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <span className="text-2xl">
                    {cat.name === "Men" ? "👨" : "👩"}
                  </span>
                </div>
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                  {cat.name}'s Shoes
                </h3>
                <button
                  onClick={() => navigate(`/products?category=${cat.name}`)}
                  className="px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Explore {cat.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Featured Products */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-20 bg-gradient-to-r from-gray-50 to-gray-100 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 animate-fade-in-up">
            Featured Shoes
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-700 to-gray-900 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {featured.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-3 animate-fade-in-up border border-gray-200"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-52 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <span className="text-lg">❤️</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-lg font-semibold mb-4">₹{product.price}</p>
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 rounded-full text-sm font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Newsletter */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-16 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-900/20"></div>
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-white mb-4 animate-fade-in-up">
            Stay in the Loop
          </h3>
          <p className="text-gray-300 text-lg mb-8 animate-fade-in-up animation-delay-200">
            Get updates on new arrivals and special offers!
          </p>
          <div className="flex justify-center max-w-md mx-auto animate-fade-in-up animation-delay-400">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-l-full border-none focus:outline-none focus:ring-2 focus:ring-gray-500 text-gray-800 placeholder-gray-500"
            />
            <button className="px-8 py-4 bg-white text-gray-800 rounded-r-full hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-4 sm:px-8 md:px-16 lg:px-24 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="animate-fade-in-up">
            <h4 className="text-white font-bold mb-4 text-xl">ShoeVerse</h4>
            <p className="text-gray-400 leading-relaxed">Step into comfort and style with our premium collection.</p>
          </div>
          <div className="animate-fade-in-up animation-delay-200">
            <h4 className="text-white font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li><button onClick={() => navigate("/")} className="text-gray-400 hover:text-white transition-colors duration-300">Home</button></li>
              <li><button onClick={() => navigate("/products")} className="text-gray-400 hover:text-white transition-colors duration-300">Shop</button></li>
              <li><button onClick={() => navigate("/cart")} className="text-gray-400 hover:text-white transition-colors duration-300">Cart</button></li>
              <li><button onClick={() => navigate("/contact")} className="text-gray-400 hover:text-white transition-colors duration-300">Contact</button></li>
            </ul>
          </div>
          <div className="animate-fade-in-up animation-delay-400">
            <h4 className="text-white font-bold mb-4 text-lg">Categories</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Men</li>
              <li className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Women</li>
            </ul>
          </div>
          <div className="animate-fade-in-up animation-delay-600">
            <h4 className="text-white font-bold mb-4 text-lg">Follow Us</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Instagram</li>
              <li className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Facebook</li>
              <li className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Twitter</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 animate-fade-in-up animation-delay-800">
            © {new Date().getFullYear()} ShoeVerse. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-shimmer {
          background: linear-gradient(110deg, #f0f0f0 8%, #e0e0e0 18%, #f0f0f0 33%);
          background-size: 200px 100%;
          animation: shimmer 1.5s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-500 {
          animation-delay: 500ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-800 {
          animation-delay: 800ms;
        }

        .animation-delay-2000 {
          animation-delay: 2000ms;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar to match theme */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #374151, #1f2937);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #4b5563, #374151);
        }
      `}</style>
    </div>
  );
}