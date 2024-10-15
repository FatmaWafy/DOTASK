/* eslint-disable */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

function HelpModal({ setIsHelpModalOpen }) {
  const [isAnswerVisible1, setIsAnswerVisible1] = useState(false);
  const [isAnswerVisible2, setIsAnswerVisible2] = useState(false);
  const [isAnswerVisible3, setIsAnswerVisible3] = useState(false);
  const [isAnswerVisible4, setIsAnswerVisible4] = useState(false);
  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsHelpModalOpen(false);
      }}
      className='fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex overflow '
    >
      <div className='scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl '>
        {/* Header */}
        <h2 className='text-2xl mb-5 text-center text-gradient'>
          Help & Support
        </h2>

        {/* FAQ Section */}
        <div className='mb-6'>
          <h3 className='  mb-1'>FAQ</h3>
          <ul className='list-disc ml-4 text-sm'>
            {/* السؤال الأول */}
            <div className='mb-2'>
              <div className='flex justify-between items-center'>
                <p className='font-bold'>How do I create a new board?</p>
                <button
                  onClick={() => setIsAnswerVisible1((prev) => !prev)}
                  className='ml-2'
                >
                  <FontAwesomeIcon
                    icon={isAnswerVisible1 ? faCaretUp : faCaretDown}
                    className='cursor-pointer w-4 h-4 text-gradient main-color'
                  />
                </button>
              </div>
              {isAnswerVisible1 && (
                <div className='mt-2 text-gray-500'>
                  To create a new board, click on the 'Add New Board' button and
                  fill in the board name and columns.
                </div>
              )}
            </div>
            {/* السؤال الثاني */}
            <div className='mb-2'>
              <div className='flex justify-between items-center'>
                <p className='font-bold'>How can I edit or delete a task?</p>
                <button
                  onClick={() => setIsAnswerVisible2((prev) => !prev)}
                  className='ml-2'
                >
                  <FontAwesomeIcon
                    icon={isAnswerVisible2 ? faCaretUp : faCaretDown}
                    className='cursor-pointer w-4 h-4 text-gradient main-color'
                  />
                </button>
              </div>
              {isAnswerVisible2 && (
                <div className='mt-2 text-gray-500'>
                  To edit or delete a task, hover over the task and click the
                  'Edit' or 'Delete' icon.
                </div>
              )}
            </div>
            {/* السؤال الثالث */}
            <div className='mb-2'>
              <div className='flex justify-between items-center'>
                <p className='font-bold'>How do I log out?</p>
                <button
                  onClick={() => setIsAnswerVisible4((prev) => !prev)}
                  className='ml-2'
                >
                  <FontAwesomeIcon
                    icon={isAnswerVisible4 ? faCaretUp : faCaretDown}
                    className='cursor-pointer w-4 h-4 text-gradient main-color'
                  />
                </button>
              </div>
              {isAnswerVisible4 && (
                <div className='mt-2 text-gray-500'>
                  To log out, click on the profile icon in the top right and
                  select 'Log Out' from the dropdown menu.
                </div>
              )}
            </div>
          </ul>
        </div>

        {/* Contact Support Section */}
        <div className='mb-6'>
          <h3 className='text-xl mb-1'>Need more help?</h3>
          <p className='text-sm mb-2 text-gray-500'>
            If you need further assistance, please feel free to contact our
            support team.
          </p>
          <button className='bg-gradient text-white hover:opacity-75   py-2  px-4 rounded-full'>
            Contact Support
          </button>
        </div>

        {/* Feedback Section */}
        <div className='mb-6'>
          <h3 className='text-xl mb-1'>Send Feedback</h3>
          <p className='text-sm mb-2 text-gray-500'>
            We would love to hear your feedback. Let us know how we can improve!
          </p>
          <button className='bg-gradient text-white hover:opacity-75   py-2  px-4 rounded-full'>
            Send Feedback
          </button>
        </div>

        {/* Footer/Close Button */}
        <div className='flex justify-end mt-4'>
          <button
            onClick={() => setIsHelpModalOpen(false)}
            className='bg-red text-white hover:opacity-75   py-2  px-4 rounded-full'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default HelpModal;
