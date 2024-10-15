/* eslint-disable */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskModal from "../modals/TaskModal";
import { Tilt } from "react-tilt";

function Task({ colIndex, taskIndex }) {
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <div>
      <Tilt className='flex items-center justify-center flex-col p-0.8 w-[300px]   box-gradient first:my-5 rounded-lg shadow-card shadow-lg shadow-[#00000030] cursor-pointer transition'>
        <div
          onClick={() => {
            setIsTaskModalOpen(true);
          }}
          draggable
          onDragStart={handleOnDrag}
          className='w-full rounded-lg bg-white dark:bg-[#2b2c37] py-6 px-3 hover-gradient dark:text-white dark:hover:gradient'
        >
          <p className='font-bold tracking-wide'>{task.title}</p>
          <p className='font-bold text-xs tracking-tighter mt-2 text-gray-500'>
            {completed} of {subtasks.length} completed tasks
          </p>
        </div>
      </Tilt>

      {isTaskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
}

export default Task;
