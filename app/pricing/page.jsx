"use client";
import React from "react";
import { useRouter } from "next/navigation";

function FreePage() {
  const router = useRouter();
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="max-w-md p-4 bg-white rounded shadow-md">
        <h1 className="text-3xl font-bold text-center">
          Haa Haa.... It's Free!
        </h1>
        <p className="text-lg text-gray-600 text-center">
          Enjoy your free gift!
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
          onClick={() => router.push("/")}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default FreePage;
