/**
 * This is a React component that renders a footer section with various sections such as
 * customer services, about Woven, discounts and memberships, and social media logos.
 */
import { NavLink } from "react-router-dom";

import Logo from "../assets/logos/woven_logo_2.png";

const Footer = () => {
	return (
		<div className="bg-black text-white py-8">
			<div className="container flex items-center justify-between text-logo-white mb-6">
				{/* Logo Section */}
				<div className="flex items-center">
					<img
						src={Logo}
						alt="Your Logo"
						className="w-32 h-30 mr-4"
					/>
				</div>

				{/* Customer Services Section */}
				<div className="flex flex-col items-start">
					<h3 className="uppercase tracking-wide font-semibold mb-4">
						Customer Services
					</h3>
					<ul>
						<li>Contact Us</li>
						<li>Shopping Delivery</li>
						<li>FAQs</li>
						<li>Returns and Refunds</li>
						<li>Payments and Pricings</li>
					</ul>
				</div>

				{/* About Woven Section */}
				<div className="flex flex-col items-start">
					<h3 className="uppercase tracking-wide font-semibold mb-4">
						About Woven
					</h3>
					<ul>
						<li>
							<NavLink to="/AboutUs" className="my-0.5">
								About Us
							</NavLink>
						</li>
						<li>
							<NavLink to="/Values-visions" className="my-0.5">
								Our Values and Visions
							</NavLink>
						</li>
						<li>Investors</li>
						<li>Partners</li>
					</ul>
				</div>

				{/* Discounts and Memberships Section */}
				<div className="flex flex-col items-start">
					<h3 className="uppercase tracking-wide font-semibold mb-4">
						Discounts and Memberships
					</h3>
					<ul>
						<li>Student Discount</li>
						<li>Refer a Friend</li>
						<li>Woven Membership</li>
					</ul>
				</div>
			</div>

			{/* Line for social media logos and copyright */}
			<div className="container border-t border-logo-gray flex justify-between items-center mt-4 pt-4">
				{/* Add your social media logos here */}
				<div className="flex">
					<span className="mr-4">Instagram</span>
					<span className="mr-4">Facebook</span>
					<span className="mr-4">Twitter/X</span>
				</div>

				{/* Copyright information */}
				<p>&copy; 2023 Your Company. All rights reserved.</p>
			</div>
		</div>
	);
};

export default Footer;
