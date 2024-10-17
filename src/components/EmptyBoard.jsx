/* eslint-disable */

import React, { useState } from "react";
import AddEditBoardModal from "../modals/AddEditBoardModal";
function EmptyBoard({ type }) {
  const [BoardModalOpen, setIsBoardModalOpen] = useState(false);

  return (
    <div className=' bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col  items-center justify-center'>
      <h3 className=' text-gray-500 font-bold'>
        {type === "edit"
          ? "This board is empty. Create a new column to get started."
          : "There are no boards available. Create a new board to get started"}
      </h3>
      <button
        onClick={() => {
          setIsBoardModalOpen(true);
        }}
        className='w-full items-center max-w-xs font-bold hover:opacity-70 dark:text-white dark:bg-gradient mt-8 relative  text-white bg-gradient py-2 rounded-full'
      >
        {type === "edit" ? "+ Add New Column" : "+ Add New Board"}
      </button>

      {BoardModalOpen && (
        <AddEditBoardModal
          type='add'
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}
export default EmptyBoard;
