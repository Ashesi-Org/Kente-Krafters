import { NavLink } from "react-router-dom";

const Register = () => {
	return (
		<div className="container">
			<div>
				<img
					src="src/assets/logos/woven_logo_1.png"
					alt=""
					className="w-1/4 mx-auto"
				/>
			</div>
			<div className="flex min-h-screen justify-center">
				<div className="flex-1">
					<h1 className="font-bold mb-4 text-black text-4xl">
						Register Your Account
					</h1>
					<div className="flex flex-col space-y-2 mb-3.5">
						<label className="text-gray-700 select-none font-medium">
							First Name
						</label>
						<input
							type="text"
							placeholder="Benjamin"
							className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 max-w-md"
						/>
					</div>
					<div className="flex flex-col space-y-2 mb-3.5">
						<label className="text-gray-700 select-none font-medium">
							Last Name
						</label>
						<input
							type="text"
							placeholder="Epton"
							className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 max-w-md"
						/>
					</div>
					<div className="flex flex-col space-y-2 mb-3.5">
						<label className="text-gray-700 select-none font-medium">
							Email Address
						</label>
						<input
							type="email"
							placeholder="benjamin.epton@woven.com"
							className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 max-w-md"
						/>
					</div>
					<div className="flex flex-col space-y-2 mb-3.5">
						<label className="text-gray-700 select-none font-medium">
							Password
						</label>
						<input
							type="password"
							className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 max-w-md"
						/>
					</div>
					<div className="flex flex-col space-y-2 mb-3.5">
						<button className="bg-black px-4 py-2 rounded-lg border text-white max-w-md">
							Create Account
						</button>
					</div>

					<div className="flex flex-col space-y-2 mb-3.5">
						<button className="bg-gray-300 px-4 py-2 rounded-lg border text-black max-w-md">
							<img
								src="src/assets/logos/google.png"
								alt=""
								className="w-6 mr-2 inline-block"
							/>
							Sign Up With Google
						</button>
					</div>

					<div className="text-center max-w-md">
						<p className="inline">Already have an account?&nbsp;</p>
						<NavLink to="/login">Login</NavLink>
					</div>
				</div>

				<div className="flex-1 justify-center">
					<img
						src="src/assets/hero_page_img.png"
						alt=""
						className="w mx-auto"
					/>
				</div>
			</div>
		</div>
	);
};

export default Register;
