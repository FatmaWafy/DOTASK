/* eslint-disable */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import useDarkMode from "../hooks/useDarkMode";
import boardsSlice from "../redux/boardsSlice";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import DeleteModal from "../modals/DeleteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faCirclePlus,
  faChevronUp,
  faChevronDown,
  faChartSimple,
  faArrowRight,
  faEyeSlash,
  faEye,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar({
  isSideBarOpen,
  setIsSideBarOpen,
  boardModalOpen,
  setBoardModalOpen,
}) {
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isElipsisOpen, setIsElipsisOpen] = useState(false);
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const [isBoardsOpen, setIsBoardsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setIsElipsisOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisOpen(false);
  };

  const onDeleteBtnClick = () => {
    dispatch(boardsSlice.actions.deleteBoard());
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
    setIsDeleteModalOpen(false);
  };

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisOpen(false);
    setBoardType("add");
  };

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? `min-w-[200px] bg-white dark:bg-[#2b2c37] fixed top-[52px] h-screen items-center left-0 z-20 shadow-lg shadow-[#00000010]`
            : `absolute z-50 left-[0px] bg-gradient flex items-center justify-center bottom-[35px] text-lg font-bold rounded-tr-full hover:text-gradient cursor-pointer dark:hover:bg-white`
        }
      >
        <div>
          {isSideBarOpen && (
            <>
              <div className='bg-white dark:bg-[#2b2c37] w-full rounded-xl p-4 mt-[20px]  '>
                <div>
                  <div
                    className='flex items-center rounded-r-full duration-500 ease-in-out cursor-pointer hover:bg-[#635fc71a] text-gradient'
                    onClick={() => setIsBoardModalOpen(true)}
                  >
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      className='main-color mr-2'
                    />
                    <p className='text-xl font-bold'>Create New Board </p>
                  </div>

                  <h3
                    onClick={() => setIsBoardsOpen(!isBoardsOpen)}
                    className='text-gradient flex items-center gap-1 cursor-pointer dark:text-gray-300 text-gray-600 font-bold mt-4'
                  >
                    <span className='flex items-center text-lg'>
                      <FontAwesomeIcon
                        icon={faChartSimple}
                        className='main-color mr-2'
                      />{" "}
                      All Boards ({boards?.length})
                    </span>
                    <FontAwesomeIcon
                      icon={isBoardsOpen ? faChevronUp : faChevronDown}
                      className=' main-color w-3 h-3'
                    />
                  </h3>

                  {isBoardsOpen && (
                    <div className='ml-4 mt-2'>
                      {boards.map((board, index) => (
                        <div
                          key={index}
                          className={`p-[8px_10px] flex items-center rounded-tr-full duration-500 ease-in-out cursor-pointer hover:bg-[#635fc71a] dark:text-white ${
                            board.isActive &&
                            "bg-gradient rounded-tr-full text-white "
                          }`}
                          onClick={() => {
                            dispatch(
                              boardsSlice.actions.setBoardActive({ index })
                            );
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className=' w-2 h-2 mr-2'
                          />
                          <p className='text-base font-normal'>{board.name}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className='text-gradient flex items-center gap-1 rounded-r-full duration-500 ease-in-out cursor-pointer hover:bg-[#635fc71a]  mt-4'
                  >
                    <p className='font-bold text-lg'>
                      {" "}
                      <FontAwesomeIcon
                        icon={faGear}
                        className='main-color'
                      />{" "}
                      Settings{" "}
                    </p>
                    <FontAwesomeIcon
                      icon={isSettingsOpen ? faChevronUp : faChevronDown}
                      className='main-color w-3 h-3'
                    />
                  </div>

                  {isSettingsOpen && (
                    <div className='ml-4 mt-2'>
                      <div
                        onClick={() => {
                          setOpenEditModal();
                        }}
                        className='p-[8px_10px] flex items-center rounded-tr-full duration-500 ease-in-out cursor-pointer hover-gradient dark:text-white  '
                      >
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className=' w-2 h-2 mr-2'
                        />
                        <p className='text-base font-normal'>Edit Board</p>
                      </div>
                      <div
                        onClick={() => {
                          setOpenDeleteModal();
                        }}
                        className='p-[8px_10px] flex items-center rounded-tr-full duration-500 ease-in-out cursor-pointer hover-gradient dark:text-white '
                      >
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className=' w-2 h-2 mr-2'
                        />
                        <p className='text-base font-normal'>Delete Board</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className=' bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg mt-6 p-2  absolute left-1/2 bottom-[170px] transform -translate-x-1/2 -translate-y-1/2 w-[200px]'>
                  <FontAwesomeIcon
                    icon={faSun}
                    className='h-5 w-5 main-color'
                  />

                  <Switch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    className={`${
                      darkSide ? "bg-[#3bb7ef]" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full mx-4`}
                  >
                    <span
                      className={`${
                        darkSide ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>

                  <FontAwesomeIcon
                    icon={faMoon}
                    className='h-5 w-5 main-color'
                  />
                </div>
              </div>
            </>
          )}

          {isSideBarOpen ? (
            <div
              onClick={() => setIsSideBarOpen((state) => !state)}
              className='bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg mt-6 p-2  absolute left-1/2 bottom-[110px] transform -translate-x-1/2 -translate-y-1/2 w-[200px]  text-lg font-bold main-color cursor-pointer'
            >
              Hide Sidebar{" "}
              <FontAwesomeIcon icon={faEyeSlash} className='ml-2' />
            </div>
          ) : (
            <div
              className='bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-full mt-6 p-2  absolute left-1/2 bottom-[45px]  w-12 h-12 [200px]  text-lg font-bold bg-gradient  cursor-pointer  text-white'
              onClick={() => setIsSideBarOpen((state) => !state)}
            >
              <FontAwesomeIcon icon={faEye} className=' ' />
            </div>
          )}
        </div>
      </div>

      {isBoardModalOpen && (
        <AddEditBoardModal type='add' setBoardModalOpen={setBoardModalOpen} />
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

      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
          title={board.name}
          type='board'
        />
      )}
    </div>
  );
}

export default Sidebar;
