import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext.jsx";
import { AuthProvider } from "./context/Authcontext.jsx";
 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <WishlistProvider>
      <CartProvider>
        <App />
         
      </CartProvider>
    </WishlistProvider>
    </AuthProvider>
  </StrictMode>
);
