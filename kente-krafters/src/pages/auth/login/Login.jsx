import { NavLink } from "react-router-dom";
import { baseEndPoint } from "../../../../expressAPI/data";
import login_page_hero from "../../../assets/hero_page_img.png";
import google_logo from "../../../assets/logos/google.png";

const Login = () => {
	const handleLoginSubmit = (e) => {
		e.preventDefault();
		// obtain the email address, password, and role from the form
		const email = e.target[0].value;
		const user_password = e.target[1].value;
		const user_type = e.target[2].value;

		// send the email address, password, and role to the backend
		fetch(baseEndPoint + "sign-in/" + user_type, {
			// declare the method
			method: "POST",

			// declare the headers
			headers: {
				"Content-Type": "application/json",
			},

			// declare the body
			body: JSON.stringify({
				email,
				user_password,
				user_type,
			}),

			// convert the response to JSON
		})
			.then(
				(response) => {
					return response.json();
				}

				// log the response
			)
			.then((response) => {
				console.log(response);
				if (response == true) {
					// redirect to the homepage
					window.location.href = "/landing";
				}
			});
	};

	return (
		<div className="container">
			<form onSubmit={handleLoginSubmit}>
				<div>
					<img
						src="src/assets/logos/woven_logo_1.png"
						alt=""
						className="w-1/4 mx-auto"
					/>
				</div>
				<div className="flex min-h-screen justify-center gap-16">
					<div className="flex-1 justify-center">
						<img
							src={login_page_hero}
							alt=""
							className="w mx-auto"
						/>
					</div>
					<div className="flex-1">
						<h1 className="font-bold mb-4 text-black text-4xl text-center">
							Login
						</h1>
						<div className="flex flex-col space-y-2 mb-3.5">
							<label className="text-gray-700 select-none font-medium">
								Email Address
							</label>
							<input
								type="email"
								placeholder="benjamin.epton@woven.com"
								className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 w-full"
							/>
						</div>
						<div className="flex flex-col space-y-2 mb-3.5">
							<label className="text-gray-700 select-none font-medium">
								Password
							</label>
							<input
								type="password"
								className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 w-full"
							/>
						</div>
						<div>
							<select
								name="role"
								id="role"
								className="px-4 py-2 mb-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 w-3/12"
							>
								<option value="customer">Customer</option>
								<option value="admin">Admin</option>
							</select>
						</div>
						<div className="flex flex-col space-y-2 mb-3.5">
							<button className="bg-black px-4 py-2 rounded-lg border text-white text-center">
								Login
							</button>
						</div>

						<div className="flex flex-col space-y-2 mb-3.5">
							<button className="bg-gray-300 px-4 py-2 rounded-lg border text-black">
								<img
									src={google_logo}
									alt=""
									className="w-6 mr-2 inline-block"
								/>
								Sign Up With Google
							</button>
							{/* <GoogleLogin
								clientId="993745405896-vcffp2398e8455i3454j353010lu86gq.apps.googleusercontent.com"
								buttonText="Login with Google"
								onSuccess={responseGoogle}
								onFailure={responseGoogle}
								cookiePolicy={"single_host_origin"}
							/> */}
						</div>

						<div className="text-center">
							<p className="inline">
								Don&apos;t have an account?&nbsp;
							</p>
							<NavLink to="/register">Sign Up</NavLink>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Login;
