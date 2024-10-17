/* eslint-disable */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";
import FilterMenu from "./FilterMenu";

function Center({ boardModalOpen, setIsBoardModalOpen }) {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

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
  }, []);

  const filteredColumns = columns.filter((col) => {
    if (activeFilter === "All") return true;
    return col.name === activeFilter;
  });

  return (
    <div
      className={
        windowSize[0] >= 991
          ? "bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-5 justify-center"
          : "bg-[#f4f7fd] scrollbar-hide h-screen flex dark:bg-[#20212c] overflow-x-scroll gap-10 justify-start"
      }
    >
      {windowSize[0] >= 768 && (
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          boardModalOpen={boardModalOpen}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
      {columns.length > 0 ? (
        <>
          <div className='flex gap-5 flex-col items-center mt-[55px]'>
            <div className='flex justify-center'>
              <FilterMenu
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />
            </div>
            <div className='flex gap-5 '>
              {filteredColumns.map((col, index) => (
                <Column
                  key={index}
                  colIndex={index}
                  isFiltered={activeFilter !== "All"}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <EmptyBoard type='edit' />
      )}
      {boardModalOpen && (
        <AddEditBoardModal
          type='edit'
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default Center;
