import { NavLink } from "react-router-dom";
import { baseEndPoint } from "../../../../expressAPI/data";
import login_page_hero from "../../../assets/hero_page_img.png";
import google_logo from "../../../assets/logos/google.png";
import company_logo from "../../../assets/logos/woven_logo_1.png";

const Register = () => {
	const handleRegisterSubmit = (e) => {
		e.preventDefault();

		// obtain the first name, last name, email address, and password from the form
		const first_name = e.target[0].value;
		const last_name = e.target[1].value;
		const email = e.target[2].value;
		const user_password = e.target[3].value;

		// send the first name, last name, email address, and password to the backend
		fetch(baseEndPoint + "sign-up", {
			// declare the method
			method: "POST",

			// declare the headers
			headers: {
				"Content-Type": "application/json",
			},

			// declare the body
			body: JSON.stringify({
				first_name,
				last_name,
				email,
				user_password,
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
					window.location.href = "/login";
				}
			});
	};

	return (
		<div className="container">
			<div>
				<img src={company_logo} alt="" className="w-1/4 mx-auto" />
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
								src={google_logo}
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
					<img src={login_page_hero} alt="" className="w mx-auto" />
				</div>
			</div>
		</div>
	);
};

export default Register;
