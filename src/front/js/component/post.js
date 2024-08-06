import React, { Component } from "react";
import { FaHeart, FaRegBookmark, FaRegCommentDots, FaShare } from 'react-icons/fa';

export const Post = () => {
	

    return <>
    
    <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden" style={{ width: '30rem', height: '35rem' }}>
                    <div className="flex items-center justify-between p-2 bg-gray-100" >
                        <div className="flex items-center">
                            <span className="text-gray-500 text-xl mr-2 p-0">
                                <div class="h-10 w-10 text-gray-600 rounded-full overflow-hidden ">




                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                                    </svg>


                                </div>


                            </span>
                            <div className="text-sm">
                                <b className="text-gray-800">@neitiry</b>

                            </div>
                        </div>
                        <button className="text-gray-500 text-xl">
                            <FaShare />
                        </button>
                    </div>
                    <div className="relative">
                        <img src="https://getwallpapers.com/wallpaper/full/2/e/2/1100213-amazing-avatar-wallpapers-1920x1080-meizu.jpg" alt="Paisaje" className="w-full h-auto object-cover" />
                        <div className="absolute bottom-4 left-4 flex space-x-4 text-white">
                            <button className="bg-gray-800 p-2 rounded-full">
                                <FaHeart />
                            </button>
                            <button className="bg-gray-800 p-2 rounded-full">
                                <FaRegCommentDots />
                            </button>
                            <button className="bg-gray-800 p-2 rounded-full">
                                <FaShare />
                            </button>
                            <button className="bg-gray-800 p-2 rounded-full ml-auto">
                                <FaRegBookmark />
                            </button>
                        </div>
                    </div>
                    <div className="p-2">

                        <p className="text-gray-600">
                            Liked by <b>4GeeksAcademy, HTML5, web</b> and <b>100,000 others</b>
                        </p>
                        <p className="text-gray-600 mt-2">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                </div>
    
    
    </>
};
