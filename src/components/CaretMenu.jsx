/* eslint-disable */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

function CaretMenu({ setIsCaretOpen, setOpenHelpModal }) {
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setIsCaretOpen(false);
    }
  };

  return (
    <div
      onClick={handleClose}
      className=' fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex overflow '
    >
      <div className='absolute top-[60px] right-[15px]'>
        <div className='text-start w-[8rem] h-auto text-md z-50 font-medium shadow-md shadow-[#364e7e1a] bg-white dark:bg-[#434455] rounded-lg p-[5px]'>
          <p className='cursor-pointer dark:text-gray-400 text-gray-700 p-1 hover:bg-gray-200 rounded-lg text-gradient  '>
            <FontAwesomeIcon icon={faPowerOff} className='main-color' /> Log Out
          </p>

          <p
            onClick={() => setOpenHelpModal()}
            className='cursor-pointer dark:text-gray-400 text-gray-700 p-1 hover:bg-gray-200 rounded-lg text-gradient  '
          >
            <FontAwesomeIcon icon={faCircleInfo} className='main-color' /> Help
          </p>
        </div>
      </div>
    </div>
  );
}

export default CaretMenu;
