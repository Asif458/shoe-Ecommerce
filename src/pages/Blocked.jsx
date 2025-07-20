import React from "react";

export default function Blocked() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl text-red-600 font-bold mb-2">
          Your account has been blocked!
        </h1>
        <p className="text-gray-600">Please contact support for help.</p>
      </div>
    </div>
  );
}
