/**
 * The above code is a React component that represents a navigation bar with various links and a search
 * input field.
 */
import { NavLink } from "react-router-dom";
import Logo from "../assets/logos/woven_logo_2.png";

const Navbar = () => {
	const handleKenteClick = () => {
		// Replace the following URL with the actual URL you want to navigate to
		window.location.href = "https://wa.od2022.repl.co/";
	};

	const handleStoleClick = () => {
		window.location.href =
			"https://6576593962d11507416a7e96--spiffy-phoenix-61e583.netlify.app/";
	};
	return (
		<div className="container">
			<NavLink to="/">
				<img src={Logo} alt="" className="w-32 mx-auto" />
			</NavLink>

			<div className="mb-4">
				<div className="flex items-center gap-4 justify-end">
					<NavLink to="/login">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6 inline cursor-pointer"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
							/>
						</svg>
					</NavLink>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6 inline cursor-pointer"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
						/>
					</svg>
					<NavLink to="/checkout" className="my-0.5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6  inline cursor-pointer"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
							/>
						</svg>
					</NavLink>
				</div>
			</div>

			<div className="flex justify-between mb-8">
				<nav id="top-left-nav" className="flex items-center gap-8">
					<NavLink to="/kente" className="my-0.5">
						Kente Shopping
					</NavLink>
					<a
						className=" text-black px-4 py-2 rounded-md cursor-pointer"
						onClick={handleStoleClick}
					>
						Graduation Stoles
					</a>
					<a
						className=" text-black px-4 py-2 rounded-md cursor-pointer"
						onClick={handleKenteClick}
					>
						Kente Customization
					</a>
					<NavLink to="/AboutUs" className="my-0.5">
						About Us
					</NavLink>
				</nav>
				<input
					type="search"
					name=""
					id=""
					className="py-1 px-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg"
					placeholder="Search"
				/>
			</div>
		</div>
	);
};

export default Navbar;
