import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Home() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [scrollY, setScrollY] = useState(0);

  const categories = [
    { name: "Men", image: "/newmen.jpg" },
    { name: "Women", image: "/woman.jpg" },
  ];

  const heroVideo = "/vid2.mp4";

  useEffect(() => {
    fetchFeatured();
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchFeatured = async () => {
    try {
      const res = await api.get("/products?_limit=4");
      setFeatured(res.data);
    } catch (err) {
      console.error("Error fetching featured products:", err);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen w-full overflow-hidden relative">
      {/* Blob Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-[10%] w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 right-[15%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-[30%] w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <header className="relative w-full h-[300px] sm:h-[400px] md:h-[550px] lg:h-[700px] flex items-center justify-center overflow-hidden shadow-xl z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        >
          <source src={heroVideo} type="video/mp4" />
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
            className="mt-10 inline-flex items-center gap-3 bg-slate-900 text-white font-bold px-10 py-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-400 ease-in-out animate-fade-in-up animation-delay-500 group border border-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-500 hover:bg-slate-800"
          >
            <span className="text-3xl group-hover:animate-jump">👟</span>
            Shop Our Latest Collection
          </button>
        </div>
      </header>

      {/* Categories Section */}
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
              style={{ animationDelay: `${index * 200 + 200}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-72 w-full object-cover group-hover:scale-115 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-6 right-6 bg-white/30 backdrop-blur-md rounded-full p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0 shadow-lg">
                  <span className="text-4xl">
                    {cat.name === "Men" ? "👨‍🦰" : "👩‍🦱"}
                  </span>
                </div>
              </div>
              <div className="p-8 text-center">
                <h3 className="text-3xl font-bold mb-4 text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
                  {cat.name}'s Collection
                </h3>
                <button
                  onClick={() => navigate(`/products?category=${cat.name}`)}
                  className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-400 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                >
                  Shop {cat.name} <span className="text-xl">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
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
              style={{ animationDelay: `${index * 150 + 200}ms` }}
            >
              <div className="relative overflow-hidden h-60">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-115 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-md">
                  <span className="text-xl">❤️</span>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-700 text-2xl font-extrabold mb-4">₹{product.price}</p>
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-full text-lg font-semibold hover:bg-slate-800 transition-all duration-400 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  View Details <span className="text-xl">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-br from-indigo-700 to-purple-800 py-20 text-center px-4 relative overflow-hidden shadow-inner z-10">
        <div className="absolute inset-0 bg-black/10"></div>
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
            />
            <button className="px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
              Subscribe Now
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-300 py-16 px-4 sm:px-8 md:px-16 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
          <div className="animate-fade-in-up">
            <h4 className="text-white font-extrabold mb-6 text-2xl tracking-wide">ShoeVerse</h4>
            <p className="text-gray-400 text-sm">Your ultimate destination for stylish and comfortable footwear.</p>
          </div>
          <div className="animate-fade-in-up animation-delay-200">
            <h4 className="text-white font-bold mb-6 text-xl">Quick Links</h4>
            <ul className="space-y-3">
              <li><button onClick={() => navigate("/")} className="text-gray-400 hover:text-white">Home</button></li>
              <li><button onClick={() => navigate("/products")} className="text-gray-400 hover:text-white">Shop All</button></li>
              <li><button onClick={() => navigate("/cart")} className="text-gray-400 hover:text-white">Cart</button></li>
              <li><button onClick={() => navigate("/orders")} className="text-gray-400 hover:text-white">Orders</button></li>
              <li><button onClick={() => navigate("/contact")} className="text-gray-400 hover:text-white">Contact Us</button></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm animate-fade-in-up animation-delay-800">
            © {new Date().getFullYear()} ShoeVerse. All rights reserved.
          </p>
        </div>
      </footer>

      {/* CUSTOM STYLES */}
      <style jsx>{`
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f5f9; /* slate-100 */
        }
        ::-webkit-scrollbar-thumb {
          background: #0f172a; /* slate-900 */
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #1e293b; /* slate-800 */
        }

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
          animation: fade-in-up 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          opacity: 0;
        }
        @keyframes blob {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%;
          }
        }
        .animate-blob {
          animation: blob 8s infinite alternate ease-in-out;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @keyframes gradient-text {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-text 3s linear infinite alternate;
        }

        @keyframes jump {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .group:hover .group-hover\\:animate-jump {
          animation: jump 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}
