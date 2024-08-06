import React, {useState} from "react";

import { Link, useNavigate} from 'react-router-dom';

import {Navbar} from '../component/navbar';
import {Post} from '../component/post';
import {Card} from '../component/card';
import {Modal} from '../component/modal';

export const Sesion = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);


    const navigate = useNavigate()

    const handleLogout = () => {
      
        navigate('/'); 
      };
    


    return (

        <div className="flex flex-col mt-0 min-h-screen bg-neutral-100">
        <Navbar />
        <div className="flex flex-col p-15 m-15">
          {/* Contenedor Principal con dos mitades */}
          <div className="flex flex-1 p-10">
            {/* Primera Mitad: Post de Instagram */}
            <div className="flex-1">

               {/* Botón para abrir el modal */}
          <div className="top-4 left-12 flex  items-center my-4 ">
            <button
              className="bg-pink-500 text-white px-8 py-4 rounded-lg hover:bg-pink-600"
              onClick={handleOpen}
            >
              Upload post
            </button>
          </div>
  
          {/* Modal */}
          <Modal isOpen={isOpen} onClose={handleClose} />

              <Post />
            </div>
  
            {/* Segunda Mitad */}
            <div className="flex-1">
              <Card />
            </div>
          </div>
  
       
  
          {/* Barra de Salida */}
          <div className="border-y-4 flex justify-center items-center py-4 gap-6 shadow">
            <div
              onClick={handleLogout}
              className="flex items-center gap-2 cursor-pointer hover:text-pink-600"
            >
              <div className="h-10 w-10 text-gray-600 rounded-full overflow-hidden">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="font-bold text-xl">Log out</p>
            </div>
          </div>
        </div>
      </div>
       
       
    );
};

