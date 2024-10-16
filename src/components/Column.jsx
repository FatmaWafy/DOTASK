/* eslint-disable */
import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import boardsSlice from "../redux/boardsSlice";

function Column({ colIndex, isFiltered }) {
  const [color, setColor] = useState(null);

  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
  ];

  const dispatch = useDispatch();

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [dispatch]);

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    if (colIndex !== prevColIndex) {
      dispatch(
        boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
      );
    }
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className='scrollbar-hide mx-5 min-w-[270px]'
    >
      <p className='font-semibold flex items-center gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]'>
        <div className={`rounded-full w-4 h-4 ${color}`} />
        {col.name} ({col?.tasks?.length})
      </p>

      <div className={`flex ${isFiltered ? "flex-wrap gap-2" : "flex-col"}`}>
        {col.tasks?.map((task, index) => (
          <Task key={index} taskIndex={index} colIndex={colIndex} />
        ))}
      </div>
    </div>
  );
}

export default Column;
