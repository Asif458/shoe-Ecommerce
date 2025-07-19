// components/ToastStyles.jsx
import { Toaster } from "react-hot-toast";

export default function ToastStyles() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          padding: "14px 20px",
          fontSize: "16px",
          background: "#ffffff",
          color: "#111827", // Tailwind gray-900
          border: "1px solid #e5e7eb", // Tailwind gray-200
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
          animation: "toastSlideIn 0.5s ease-out",
        },
        success: {
          iconTheme: {
            primary: "#22c55e", // green-500
            secondary: "#ecfdf5",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444", // red-500
            secondary: "#fee2e2",
          },
        },
      }}
    />
  );
}
