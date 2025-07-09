import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext.jsx";
import { AuthProvider } from "./context/Authcontext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <WishlistProvider>
      <CartProvider>
        <App />
         <ToastContainer position="top-right"
         autoClose={6000}
         theme="colored"/>
      </CartProvider>
    </WishlistProvider>
    </AuthProvider>
  </StrictMode>
);
