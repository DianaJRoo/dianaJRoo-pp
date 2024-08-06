import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 pl-20 ">DTech Inc</span>
				</Link>
				<div className="flex items-center justify-center ">
					<div className="relative w-full max-w-md pl-20">
						<input
							type="text"
							placeholder="Buscar..."
							className="w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<div className="absolute inset-y-0 right-0 flex items-center pr-3">
							<FaSearch className="text-gray-500" />
						</div>
					</div>
				</div>
				<div className="ml-auto">
					
				</div>
			</div>
		</nav>
	);
};
