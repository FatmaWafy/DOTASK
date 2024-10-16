/* eslint-disable */
import React, { useState } from "react";

function FilterMenu({ activeFilter, setActiveFilter }) {
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className='flex justify-center items-center mb-4 scrollbar-hide mt-50px'>
      <div className='text-start w-auto h-auto text-md font-medium   dark:bg-[#434455] rounded-lg p-[10px] flex justify-center items-center gap-3 mt-4'>
        <div className='flex space-x-2'>
          <button
            className={`items-center p-[2px_10px] rounded-lg ${
              activeFilter === "All"
                ? "bg-gradient text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handleFilterClick("All")}
          >
            All
          </button>

          <button
            className={`items-center p-[2px_10px] rounded-lg ${
              activeFilter === "Todo"
                ? "bg-gradient text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handleFilterClick("Todo")}
          >
            Todo
          </button>

          <button
            className={`items-center p-[2px_10px] rounded-lg ${
              activeFilter === "In Progress"
                ? "bg-gradient text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handleFilterClick("In Progress")}
          >
            In Progress
          </button>

          <button
            className={`items-center p-[2px_10px] rounded-lg ${
              activeFilter === "Completed"
                ? "bg-gradient text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => handleFilterClick("Completed")}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterMenu;
