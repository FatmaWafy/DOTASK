/* eslint-disable */
import React from "react";

function FilterMenu({ setIsFilterOpen }) {
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setIsFilterOpen(false);
    }
  };

  return (
    <div
      onClick={handleClose}
      className=' fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex overflow '
    >
      <div className='absolute top-[60px] right-[15px] flex justify-end'>
        <div className='text-start w-[8rem] h-auto text-md z-50 font-medium shadow-md shadow-[#364e7e1a] bg-white dark:bg-[#434455] rounded-lg p-[5px]'>
          <p className='cursor-pointer dark:text-gray-400 text-gray-700 p-1 hover:bg-gray-200 rounded-lg text-gradient  '>
            Filter By Status
          </p>
        </div>
      </div>
    </div>
  );
}

export default FilterMenu;
