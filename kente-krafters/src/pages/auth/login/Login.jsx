const Login = () => {
	return (
		<div className="container">
			<img
				src="src/assets/logos/woven_logo_1.png"
				alt=""
				className="w-1/4 mx-auto"
			/>

			<h1 className="font-bold mb-4 text-black text-4xl text-center">
				Login
			</h1>
			<div className="flex flex-col space-y-2 mb-3.5">
				<label className="text-gray-700 select-none font-medium">
					Email Address
				</label>
				<input
					type="text"
					placeholder="benamin.epton@woven.com"
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

			<div className="flex flex-col space-y-2 mb-3.5 mt-14">
				<button className="bg-black px-4 py-2 rounded-lg border text-white max-w-md">
					Login
				</button>
			</div>
		</div>
	);
};

export default Login;
