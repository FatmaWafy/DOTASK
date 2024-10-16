/* eslint-disable */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

function CaretMenu({ setIsCaretOpen, setOpenHelpModal }) {
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setIsCaretOpen(false);
    }
  };

  return (
    <div
      onClick={handleClose}
      className=' fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 left-0 bottom-0 justify-center items-center flex overflow'
    >
      <div className='absolute top-[60px] right-[15px]'>
        <div className='text-start w-[10rem] h-auto text-md z-50 font-medium shadow-md shadow-[#364e7e1a] bg-white dark:bg-[#434455] rounded-lg p-[10px]'>
          <p
            className={`p-[8px_10px] flex items-center rounded-tr-full duration-500 ease-in-out cursor-pointer hover:bg-[#635fc71a] dark:text-white`}
          >
            <FontAwesomeIcon icon={faPowerOff} className='  mr-2' /> Log Out
          </p>

          <p
            onClick={() => setOpenHelpModal()}
            className={`p-[8px_10px] flex items-center rounded-tr-full duration-500 ease-in-out cursor-pointer hover:bg-[#635fc71a] dark:text-white`}
          >
            <FontAwesomeIcon icon={faCircleInfo} className='  mr-2' /> Help
          </p>
        </div>
      </div>
    </div>
  );
}

export default CaretMenu;
