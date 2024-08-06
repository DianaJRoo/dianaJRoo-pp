import React, { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Context } from "../store/appContext";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  
  const [userInfo, setUserInfo] = useState({
    name: "",
    surName: "",
    userName: "",
    password: "",

  })

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  

  }
  console.log(userInfo)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo)
    console.log(userInfo.userName)
    
  
  var registered = null
    try{registered = await actions.createNewUser(userInfo) } 
    catch (error) {
     
      console.log(error.message)
    	if (error.message == "Username already exists"){
       
        alert("username already exists" );
        return;
      }
     
    return false; 
  }

    if (registered) navigate('/login')
    else undefined
  };


  return (<>
  
    <div id='register-body' className='flex flex-col justify-center mt-0 items-center bg-neutral-100' style={{backgroundImage: 'url("https://wallpapercave.com/wp/wp5539841.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh'}} >
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-4 mx-auto max-w-screen-sm h-screen ">
       
        <div id="form1" className="border border-gray-900/10 pb-15 p-4 mx-auto max-w-screen-sm rounded-lg shadow-2">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
             Personal Information   
          </h2>

          <div className="sm:col-span-3 mt-2">
              <label htmlFor="nombre" className="block text-sm font-medium leading-6 text-gray-900">
                Name
             </label>
              <div className="sm:col-span-3">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  onChange={handleChange}
                  value={userInfo.name}
                  className="shadow-md block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3 mt-2">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Surname
             </label>
              <div className="sm:col-span-3">
                <input
                  id="surName"
                  name="surName"
                  type="text"
                  autoComplete="surName"
                  required
                  onChange={handleChange}
                  value={userInfo.surName}
                  className="shadow-md block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3 mt-2">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Username
             </label>
              <div className="sm:col-span-3">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  autoComplete="userName"
                  required
                  onChange={handleChange}
                  value={userInfo.userName}
                  className="shadow-md block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between ">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password                
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  required
                  value={userInfo.password}
                  className="shadow-md block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

            <div className="footer" style={{ display: 'flex', justifyContent: 'center' }}>

              <button className="flex justify-center mt-7 mb-1 bg-pink-900 hover:bg-pink-700 text-pink-200 hover:text-pink-50 font-overpass text-base font-semibold py-3 px-10 rounded "
                type="submit"
                title="Ingresar"
                name="Ingresar">
               
               
                  Register
                
              </button>

            </div>
          </div >
        </div >

        <div className="flex justify-between items-center text-white">
                    <Link to="/"><strong>Go Back!</strong></Link>

                </div>

      </form >
      


    </div >
  </>
  );
}