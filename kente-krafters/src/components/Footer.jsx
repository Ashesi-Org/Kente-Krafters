const Footer = () => {
	return (
		<div className="container flex justify-between text-logo-gray mb-8 mt-16">
			<div>
				<h3 className="uppercase tracking-wide text-black font-semibold mb-4">
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

			<div>
				<h3 className="uppercase tracking-wide text-black font-semibold  mb-4">
					About Woven
				</h3>
				<ul>
					<li>About Us</li>
					<li>Our Values and Visions</li>
					<li>Investors</li>
					<li>Partners</li>
				</ul>
			</div>

			<div>
				<h3 className="uppercase tracking-wide text-black font-semibold  mb-4">
					Discounts and Memberships
				</h3>
				<ul>
					<li>Student Discount</li>
					<li>Refer a Friend</li>
					<li>Woven Membership</li>
				</ul>
			</div>
		</div>
	);
};

export default Footer;
