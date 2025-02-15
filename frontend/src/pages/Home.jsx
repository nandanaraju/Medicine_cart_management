import React from "react";

const Home = () => {
  return (
    <div>
    <div className="bg-green-900 text-white min-h-screen flex flex-col items-center p-10 mt-16">
      <h1 className="text-2xl font-bold mb-4">Looking for a specific medicine?</h1>
      <input
        type="text"
        placeholder="Search from 18000+ Products..."
        className="w-3/4 p-3 text-black rounded"
      />
      <p className="mt-4">
        I have a prescription, <span className="text-blue-400 cursor-pointer">Upload the Prescription</span>
      </p>
    </div>
    </div>
  );
};

export default Home;
