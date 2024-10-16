/* eslint-disable */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo-mobile.png";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import MobileDropDown from "./MobileDropDown";
import CaretMenue from "./CaretMenu";
import HelpModal from "../modals/HelpModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

function Header({ boardModalOpen, setBoardModalOpen }) {
  const dispatch = useDispatch();
  const [isCaretOpen, setIsCaretOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openAddEditTask, setOpenAddEditTask] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const setOpenHelpModal = () => {
    setIsHelpModalOpen(true);
    setIsCaretOpen(false);
  };

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setBoardType("add");
  };

  return (
    <div className='p-1 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 shadow-lg shadow-[#00000010]'>
      <header className=' flex justify-between dark:text-white items-center  p-[2px_12px]'>
        {/* left side */}
        <div className=' flex items-center space-x-2  md:space-x-4'>
          <img src={logo} alt='logo' className=' h-6 w-6' />
          <h3 className=' md:inline-block hidden font-bold  font-sans md:text-4xl text-gradient'>
            DoTask
          </h3>

          <div className=' flex items-center '>
            <h3
              title='Current Board '
              className=' truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans  text-gradient md:hidden'
            >
              {board.name}
            </h3>
            <button
              className='md:hidden cursor-pointer w-5 h-5 main-color'
              onClick={onDropdownClick}
            >
              <FontAwesomeIcon icon={openDropdown ? faCaretUp : faCaretDown} />
            </button>
          </div>
        </div>

        {/* right side */}
        <div className='flex items-center '>
          {/* search btn */}
          <button onClick={() => {}} className='xs:hidden  ml-[15px]'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='main-color' />
          </button>

          {/* add btn */}
          <button
            title='Add Task'
            onClick={() => {
              setOpenAddEditTask((state) => !state);
            }}
            className='ml-[15px]'
          >
            <FontAwesomeIcon
              icon={faCirclePlus}
              className='w-7 h-7 main-color'
            />
          </button>

          {/* profile btn */}
          <button
            className='relative xs:hidden flex items-center ml-[10px]'
            onClick={() => {}}
          >
            <FontAwesomeIcon icon={faUser} className='main-color  w-5 h-5' />
          </button>

          {/* login btn */}
          <button
            className='ml-[2px]'
            onClick={() => {
              setIsCaretOpen((state) => !state);
              setBoardType("edit");
              setOpenDropdown(false);
            }}
          >
            <FontAwesomeIcon
              icon={isCaretOpen ? faCaretUp : faCaretDown}
              className='cursor-pointer w-4 h-4 main-color'
            />
          </button>
        </div>
      </header>

      {isCaretOpen && (
        <CaretMenue
          setIsCaretOpen={setIsCaretOpen}
          setOpenHelpModal={setOpenHelpModal}
        />
      )}

      {isHelpModalOpen && <HelpModal setIsHelpModalOpen={setIsHelpModalOpen} />}

      {openDropdown && (
        <MobileDropDown
          setOpenDropdown={setOpenDropdown}
          setBoardModalOpen={setBoardModalOpen}
          boardModalOpen={boardModalOpen}
        />
      )}

      {boardModalOpen && (
        <AddEditBoardModal
          type={boardType}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}

      {openAddEditTask && (
        <AddEditTaskModal
          setOpenAddEditTask={setOpenAddEditTask}
          device='mobile'
          type='add'
        />
      )}
    </div>
  );
}

export default Header;
