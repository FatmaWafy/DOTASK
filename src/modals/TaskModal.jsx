/* eslint-disable */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ElipsisMenu from "../components/ElipsisMenu";
import boardsSlice from "../redux/boardsSlice";
import Subtask from "../components/Subtask";
import DeleteModal from "./DeleteModal";
import useDarkMode from "../hooks/useDarkMode";
import AddEditTaskModal from "./AddEditTaskModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

function TaskModal({ taskIndex, colIndex, setIsTaskModalOpen }) {
  const [isCaretOpen, setIsCaretOpen] = useState(false);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const subtasks = task.subtasks;
  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const dispatch = useDispatch();
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const [theme, setTheme] = useDarkMode();

  const onChange = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(
      boardsSlice.actions.setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      })
    );
    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    dispatch(boardsSlice.actions.deleteTask({ taskIndex, colIndex }));
    setIsTaskModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setIsCaretOpen(false);
    }
  };
  return (
    <div
      onClick={onClose}
      className='  fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex overflow '
    >
      <div className=' scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl'>
        <div className=' relative flex   justify-between w-full items-center'>
          <h1 className=' text-lg'>{task.title}</h1>

          <FontAwesomeIcon
            onClick={() => {
              setIsElipsisMenuOpen((state) => !state);
              setIsCaretOpen((state) => !state);
              handleClose;
            }}
            icon={isCaretOpen ? faCaretUp : faCaretDown}
            className='cursor-pointer w-4 h-4 main-color'
          />

          {isElipsisMenuOpen && (
            <ElipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type='Task'
            />
          )}
        </div>

        <p className=' text-gray-500 font-[600] tracking-wide text-xs pt-6'>
          {task.description}
        </p>

        <p className=' pt-6 text-gray-500 tracking-widest text-sm'>
          Subtasks ({completed} of {subtasks.length})
        </p>

        {/* subtasks section */}
        <div className=' mt-3 space-y-2'>
          {subtasks.map((subtask, i) => {
            return (
              <Subtask
                index={i}
                taskIndex={taskIndex}
                colIndex={colIndex}
                key={i}
              />
            );
          })}
        </div>

        {/* Current Status Section */}
        <div className='mt-8 flex flex-col space-y-3'>
          <label className='  text-sm dark:text-white text-gray-500'>
            Current Status
          </label>
          <select
            className={`select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:outline-gradient outline-1 border-[1px] border-gray-300   ${
              theme === "dark" ? "dark-dropdown" : "light-dropdown"
            } `}
            value={status}
            onChange={onChange}
          >
            {columns.map((col, index) => (
              <option className='status-options' key={index}>
                {col.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
          type='task'
          title={task.title}
        />
      )}

      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setOpenAddEditTask={setIsAddTaskModalOpen}
          //setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          type='edit'
          taskIndex={taskIndex}
          prevColIndex={colIndex}
        />
      )}
    </div>
  );
}

export default TaskModal;
