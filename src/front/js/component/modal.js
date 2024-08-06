import React from 'react';

export const Modal = ({ isOpen, onClose }) => {
  return (
    <>
    {/* Modal Background */}
    {isOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        {/* Modal Content */}
        <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Modal Title</h2>
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={onClose}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <p className="text-gray-700">This is a simple modal. You can place your content here.</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

