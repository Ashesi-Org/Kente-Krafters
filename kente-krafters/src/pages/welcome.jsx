import { useState, useEffect } from "react";

const WelcomePage = () => {
	const [backgroundImage, setBackgroundImage] = useState("");

	useEffect(() => {
		// You can implement logic here to fetch or generate the background image URL
		// For now, I'm just using a placeholder URL
		const placeholderImage = "celebrate_kente.jpg";
		setBackgroundImage(placeholderImage);
	}, []);

	const handleWelcomeButtonClick = () => {
		// Add logic for the welcome button click event
		console.log("Welcome button clicked!");
	};

	return (
		<div
			className="flex flex-col items-center justify-center h-screen"
			style={{
				backgroundImage: `url(https://stock.adobe.com/search?k=website+background&asset_id=220911898)`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<img
				src="src/assets/logos/woven_logo_2.png"
				alt=""
				className="w-32 mb-8"
			/>

			<div className="text-white text-center mb-8">
				<h1 className="text-4xl font-bold">Welcome to Our Website!</h1>
				<p className="text-lg">
					Explore and discover something amazing.
				</p>
			</div>

			<button
				onClick={handleWelcomeButtonClick}
				className="bg-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-700"
			>
				Welcome
			</button>

			<div className="text-white mt-8">
				<h2 className="text-2xl font-bold mb-4">About Us</h2>
				<p className="text-lg">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					Nullam faucibus finibus lectus, et feugiat ex congue id.
					Nulla facilisi.
				</p>
			</div>
		</div>
	);
};

export default WelcomePage;
