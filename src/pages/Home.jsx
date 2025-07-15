import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Make sure your API file is correct

export default function Home() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  // const [showShimmer, setShowShimmer] = useState(true); // Removed shimmer state
  const [scrollY, setScrollY] = useState(0);

  // Categories with new, potentially more illustrative images for design
  const categories = [
    { name: "Men", image: "/newmen.jpg" },  
    { name: "Women", image: "/woman.jpg" },  
  ];

  // Make sure you have a video like this in your /public folder
  const heroVideo = "/vid2.mp4"; // Example video for the banner

  useEffect(() => {
    fetchFeatured();

     

    // Parallax scrolling effect (unchanged functionality)
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      // clearTimeout(shimmerTimer); // Removed shimmer cleanup
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

 

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen w-full overflow-hidden relative">
      {/* Dynamic Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-[10%] w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 right-[15%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-[30%] w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000"></div>
      </div>

      {/* Enhanced Hero Banner with Video & Parallax */}
      <header className="relative w-full h-[300px] sm:h-[400px] md:h-[550px] lg:h-[700px] flex items-center justify-center overflow-hidden shadow-xl z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }} // Adjusted parallax strength
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/60 to-transparent z-10"></div>

        <div className="relative z-20 text-white text-center px-4 max-w-4xl animate-fade-in-up">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight drop-shadow-lg">
            Elevate Your Stride with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 animate-gradient-text">
              ShoeVerse
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-200 opacity-90 leading-relaxed animate-fade-in-up animation-delay-300 drop-shadow-md">
            Discover the perfect pair that blends style, comfort, and unmatched durability.
          </p>
          <button
            onClick={() => navigate("/products")}
            // Changed button color to bg-slate-900, adjusted hover, border, and ring colors
            className="mt-10 inline-flex items-center gap-3 bg-slate-900 text-white font-bold px-10 py-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-400 ease-in-out animate-fade-in-up animation-delay-500 group border border-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-500 hover:bg-slate-800"
          >
            <span className="text-3xl group-hover:animate-jump">👟</span> {/* Larger emoji with jump animation */}
            Shop Our Latest Collection
          </button>
        </div>
      </header>

      {/* --- Enhanced Categories Section --- */}
      <section className="w-full py-24 px-4 sm:px-8 md:px-16 lg:px-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900 animate-fade-in-up">
            Categories For You
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {categories.map((cat, index) => (
            <div
              key={cat.name}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-4 animate-fade-in-up border border-gray-100 relative"
              style={{ animationDelay: `${index * 200 + 200}ms` }} // Staggered animation
            >
              <div className="relative overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-72 w-full object-cover group-hover:scale-115 transition-transform duration-700 ease-in-out" // More aggressive zoom
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div> {/* Darker overlay */}
                <div className="absolute top-6 right-6 bg-white/30 backdrop-blur-md rounded-full p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0 shadow-lg"> {/* Larger, blurred floating icon */}
                  <span className="text-4xl">
                    {cat.name === "Men" ? "👨‍🦰" : "👩‍🦱"} {/* More specific emojis */}
                  </span>
                </div>
              </div>
              <div className="p-8 text-center">
                <h3 className="text-3xl font-bold mb-4 text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
                  {cat.name}'s Collection
                </h3>
                <button
                  onClick={() => navigate(`/products?category=${cat.name}`)}
                  // Changed button color to bg-slate-900, adjusted hover
                  className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-400 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                >
                  Shop {cat.name} <span className="text-xl">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Enhanced Featured Products Section --- */}
      <section className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-24 bg-gradient-to-r from-gray-50 to-gray-100 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900 animate-fade-in-up">
            Our Best Sellers
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {featured.map((product, index) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-4 animate-fade-in-up border border-gray-100 relative"
              style={{ animationDelay: `${index * 150 + 200}ms` }} // Staggered animation
            >
              <div className="relative overflow-hidden h-60"> {/* Fixed height for image container */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-115 transition-transform duration-700 ease-in-out" // More aggressive zoom
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-md">
                  <span className="text-xl">❤️</span>
                </div>
              </div>
              <div className="p-6 text-center"> {/* Centered product info */}
                <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-700 text-2xl font-extrabold mb-4">₹{product.price}</p> {/* Larger price */}
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  // Changed button color to bg-slate-900, adjusted hover
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-full text-lg font-semibold hover:bg-slate-800 transition-all duration-400 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  View Details <span className="text-xl">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Call to Action / Newsletter Section --- */}
      <section className="bg-gradient-to-br from-indigo-700 to-purple-800 py-20 text-center px-4 relative overflow-hidden shadow-inner z-10">
        <div className="absolute inset-0 bg-black/10"></div> {/* Subtle dark overlay */}
        <div className="relative z-10">
          <h3 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 animate-fade-in-up">
            Never Miss a Step
          </h3>
          <p className="text-gray-200 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Sign up for our newsletter to get exclusive deals, new arrivals, and style tips delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row justify-center max-w-lg mx-auto gap-4 animate-fade-in-up animation-delay-400">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 rounded-full border-2 border-white/30 focus:outline-none focus:ring-4 focus:ring-white/50 bg-white/10 text-white placeholder-gray-300 text-lg transition-all duration-300"
              aria-label="Email for newsletter"
            />
            <button
              // Changed button color to bg-slate-900, text to white, adjusted hover
              className="px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </section>

      {/* --- Enhanced Footer --- */}
      <footer className="bg-gray-950 text-gray-300 py-16 px-4 sm:px-8 md:px-16 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
          <div className="animate-fade-in-up">
            <h4 className="text-white font-extrabold mb-6 text-2xl tracking-wide">ShoeVerse</h4>
            <p className="text-gray-400 leading-relaxed text-sm">Your ultimate destination for stylish and comfortable footwear. Step into a world where quality meets fashion.</p>
          </div>
          <div className="animate-fade-in-up animation-delay-200">
            <h4 className="text-white font-bold mb-6 text-xl">Quick Links</h4>
            <ul className="space-y-3">
              <li><button onClick={() => navigate("/")} className="text-gray-400 hover:text-white transition-colors duration-300 text-base">Home</button></li>
              <li><button onClick={() => navigate("/products")} className="text-gray-400 hover:text-white transition-colors duration-300 text-base">Shop All</button></li>
              <li><button onClick={() => navigate("/cart")} className="text-gray-400 hover:text-white transition-colors duration-300 text-base">Cart</button></li>
              <li><button onClick={() => navigate("/orders")} className="text-gray-400 hover:text-white transition-colors duration-300 text-base">Orders</button></li>
              <li><button onClick={() => navigate("/contact")} className="text-gray-400 hover:text-white transition-colors duration-300 text-base">Contact Us</button></li>
            </ul>
          </div>
          <div className="animate-fade-in-up animation-delay-400">
            <h4 className="text-white font-bold mb-6 text-xl">Shop Categories</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer text-base">Men's Footwear</li>
              <li className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer text-base">Women's Footwear</li>
              <li className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer text-base">New Arrivals</li>
              <li className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer text-base">Best Sellers</li>
            </ul>
          </div>
          <div className="animate-fade-in-up animation-delay-600">
            <h4 className="text-white font-bold mb-6 text-xl">Connect With Us</h4>
            {/* <div className="flex space-x-4 mb-6">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors duration-300 text-3xl">📸</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors duration-300 text-3xl">👍</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-3xl">🐦</a>
            </div> */}
            <p className="text-gray-400 text-sm">Email: info@shoeverse.com</p>
            <p className="text-gray-400 text-sm">Phone: +91 98765 43210</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm animate-fade-in-up animation-delay-800">
            © {new Date().getFullYear()} ShoeVerse. All rights reserved.  
          </p>
        </div>
      </footer>

      {/* --- Custom CSS Animations (unchanged) --- */}
      <style jsx>{`
        /* Shimmer Animation (kept for reference, but not used in rendering) */
        @keyframes shimmer {
          0% { background-position: -500px 0; }
          100% { background-position: 500px 0; }
        }
        .animate-shimmer {
          background-size: 1000px 100%;
          animation: shimmer 1.5s infinite linear;
        }

        /* Fade-in-up Animation */
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* Smoother curve */
          opacity: 0; /* Ensures it starts invisible */
        }

        /* Blob Animation for background shapes */
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          14% { border-radius: 50% 50% 30% 70% / 50% 50% 50% 50%; }
          28% { border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%; }
          42% { border-radius: 70% 30% 60% 40% / 70% 40% 60% 30%; }
          56% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
        .animate-blob {
          animation: blob 8s infinite alternate ease-in-out;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        /* Gradient Text Animation */
        @keyframes gradient-text {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-text 3s linear infinite alternate;
        }

        /* Button Jump Animation */
        @keyframes jump {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-5px); }
          50% { transform: translateY(0); }
          75% { transform: translateY(-2px); }
        }
        .group:hover .group-hover:animate-jump {
          animation: jump 0.6s ease-in-out;
        }

        /* Global transition for consistency */
        * {
          box-sizing: border-box;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #e2e8f0; /* Light gray for track */
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #6b46c1, #805ad5); /* Purple gradient */
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #553c9a, #6b46c1); /* Darker purple on hover */
        }
      `}</style>
    </div>
  );
}