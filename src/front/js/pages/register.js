import React, { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Context } from "../store/appContext";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  
  const [userInfo, setUserInfo] = useState({
    name: "",
    surname: "",
    username: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  console.log(userInfo);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userInfo.password.length < 5 || userInfo.password.length > 10) {
      setError("Password must be between 5 and 10 characters");
      return;
    }

    try {
      const registered = await actions.createNewUser(userInfo);
      if (registered) navigate('/login');
    } catch (error) {
      if (error.message === "Username already exists") {
        alert("Username already exists");
      } else {
        alert("Error creating user: " + error.message);
      }
    }
  };

  return (
    <div
      id='register-body'
      className='flex flex-col justify-center mt-0 items-center bg-neutral-100'
      style={{
        backgroundImage: 'url("https://wallpapercave.com/wp/wp5539841.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh'
      }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-4 mx-auto max-w-screen-sm h-screen">
        <div id="form1" className="border border-gray-900/10 pb-15 p-4 mx-auto max-w-screen-sm rounded-lg shadow-2">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>

          <div className="sm:col-span-3 mt-2">
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
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
            <label htmlFor="surname" className="block text-sm font-medium leading-6 text-gray-900">
              Surname
            </label>
            <div className="sm:col-span-3">
              <input
                id="surname"
                name="surname"
                type="text"
                autoComplete="surname"
                required
                onChange={handleChange}
                value={userInfo.surname}
                className="shadow-md block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3 mt-2">
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="sm:col-span-3">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                onChange={handleChange}
                value={userInfo.username}
                className="shadow-md block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
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
          </div>

          <div className="footer" style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              className="flex justify-center mt-7 mb-1 bg-pink-900 hover:bg-pink-700 text-pink-200 hover:text-pink-50 font-overpass text-base font-semibold py-3 px-10 rounded"
              type="submit"
              title="Register"
            >
              Register
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center text-white mt-4">
          <Link to="/"><strong>Go Back!</strong></Link>
        </div>
      </form>
    </div>
  );
};
