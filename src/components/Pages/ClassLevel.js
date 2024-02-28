import React from "react";
import { CreateButton } from "../Partial/CreateButton";

export const ClassLevel = () => {
  // Sample data for grades
  const grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4"]; // Add more grades as needed

  return (
    <div className="p-8 classlevel_main">
      <h1 className="mb-8 text-4xl font-bold">List of Class Levels</h1>

      <CreateButton
        destination={"/dashboard/classlevel/create"} 
        styles={"create-btn-main bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"}
        label={"add classlevel"}
      />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {grades.map((grade, index) => (
          <div
            key={index}
            className="overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            <div className="p-4 text-white bg-gradient-to-r from-blue-500 to-purple-500">
              <h2 className="mb-2 text-xl font-semibold">{grade}</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600">
                {grade} Reading Materials📖
              </p>
              {/* Add more content or actions specific to each grade */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};