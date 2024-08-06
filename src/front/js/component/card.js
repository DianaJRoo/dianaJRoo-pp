import React, { Component } from "react";


export const Card = () => {
	

    return <>
  <div className="absolute top-8 right-4 flex justify-center items-center">
      <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden" style={{ width: '20rem' }}>
        <div className="flex items-center justify-between p-2 bg-gray-100">
          <div className="flex items-center">
            <span className="text-gray-500 text-xl mr-2 p-4">
              <div className="h-20 w-20 text-gray-600 rounded-full overflow-hidden">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                </svg>
              </div>
            </span>
            <div className="text-sm">
              <b className="text-gray-800">Jake Sully</b> <br/>
              <b className="text-gray-800">200 publicaciones</b>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
    </>
};
