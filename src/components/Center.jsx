/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";

function Center({ boardModalOpen, setBoardModalOpen }) {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <div
      className={
        windowSize[0] >= 991
          ? " bg-[#f4f7fd]  scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-5  justify-center align-center"
          : " bg-[#f4f7fd]  scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-10  justify-start align-center"
      }
    >
      {windowSize[0] >= 768 && (
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          boardModalOpen={boardModalOpen}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}
      {columns.length > 0 ? (
        <>
          {columns.map((col, index) => (
            <Column key={index} colIndex={index} />
          ))}
        </>
      ) : (
        <>
          <EmptyBoard type='edit' />
        </>
      )}
      {boardModalOpen && (
        <AddEditBoardModal type='edit' setBoardModalOpen={setBoardModalOpen} />
      )}
    </div>
  );
}

export default Center;
