import React, { useContext } from 'react';

import { Link } from 'react-router-dom';



export const Home = () => {

    return (
        <>
            <div id='hero-body' className="flex justify-center items-center mt-0 mb-0 " style={{backgroundImage: 'url("https://i.pinimg.com/originals/6f/61/23/6f6123450dd73e00a50cdea026d26310.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh'}}>
            
                <div id='hero' className='d-flex flex-column'  >
                    <h1 className='text-5xl text-gray-500 font-bold text-center'>
                
                    </h1>
                    <div className='mt-16'>
                        <Link id='boton-hero' className='block m-auto text-center text-lg text-pink-200 hover:text-pink-600 h-14 rounded-xl border-b-0 border-slate-200 w-96' to='/register' style={{ paddingTop: '12px' }}>
                            <strong className='mt-4'>Start now!</strong>
                        </Link>
                        <Link id='boton-hero2' className="block m-auto text-lg text-pink-200 hover:text-pink-600 text-center mt-2 p-0 h-14 rounded-xl border-b-0 border-2 border-slate-200 w-96" style={{ paddingTop: '12px' }} to='/login'>
                            <strong className='py-2'>I already have an account!</strong>
                        </Link>
                    </div>
                </div>
            </div>
           
        </>
    );
};