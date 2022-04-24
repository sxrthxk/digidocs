import React from "react";
import { FaPlusCircle } from "react-icons/fa";
import DashLayout from "../lib/components/DashLayout";

const HomePage = () => {
  return (
    <DashLayout>
      <div className="p-2 md:p-4">
        <h1 className="text-4xl font-semibold mb-4">Your Documents</h1>
        <div className="flex p-2 bg-gray-200 drop-shadow-sm rounded-lg">
          <div className="px-24 py-12 flex flex-col items-center bg-green-800 text-white rounded-md cursor-pointer">
            <FaPlusCircle className="mb-3 w-6 h-6" />
            <span>Add</span>
          </div>
        </div>
      </div>
    </DashLayout>
  );
};

export default HomePage;
