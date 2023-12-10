import Navbar from "../../components/Navbar";
import CategoryCard from "../../components/CategoryCard";
import Footer from "../../components/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const cardDetails = [
	{
		id: "1",
		src: "src/assets/category_kente.png",
		alt: "Image 1",
		link: "#",
		heading: "Kente Fabrics",
		caption:
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis exercitationem placeat in distinctio nisi quibusdam similique eum velit aperiam, assumenda, quo quos quas unde vitae quisquam excepturi vel ratione obcaecati.",
	},
	{
		id: "2",
		src: "src/assets/category_stole.png",
		alt: "Image 1",
		link: "#",
		heading: "Graduation Stoles",
		caption:
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis exercitationem placeat in distinctio nisi quibusdam similique eum velit aperiam, assumenda, quo quos quas unde vitae quisquam excepturi vel ratione obcaecati.",
	},
	{
		id: "3",
		src: "src/assets/category_kente.png",
		alt: "Image 1",
		link: "#",
		heading: "Kente Fabrics",
		caption:
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis exercitationem placeat in distinctio nisi quibusdam similique eum velit aperiam, assumenda, quo quos quas unde vitae quisquam excepturi vel ratione obcaecati.",
	},
];

const HomePage = () => {
	return (
		<div>
			<Navbar />

			<Carousel
				className="container"
				autoPlay="true"
				maxHeight="500px"
				infiniteLoop="true"
				interval={7000}
			>
				<div>
					<img
						src="src/assets/carousel_img_1.jpg"
						alt=""
						style={{ maxHeight: "500px", width: "auto" }}
					/>
					<p>
						&ldquo;Enhance your wedding celebration with our
						beautiful stoles! 💍✨ Elevate your special day in
						style. #CherishLove&rdquo;
					</p>
				</div>
				<div>
					<img
						src="src/assets/carousel_img_2.jpg"
						alt=""
						style={{ maxHeight: "500px", width: "auto" }}
					/>
					<p>
						&ldquo;Embrace brotherhood with our premium fabrics!
						🤝✨ Elevate unity in style. #FabricOfConnection&rdquo;
					</p>
				</div>
				<div>
					<img
						src="src/assets/carousel_img_3.jpg"
						alt=""
						style={{ maxHeight: "500px", width: "auto" }}
					/>
					<p>
						&ldquo;Elevate your graduation with our stunning stoles!
						🎓✨ #CelebrateSuccess&rdquo;
					</p>
				</div>
			</Carousel>

			<div></div>
			<div className="container ">
				<h2 className="text-center uppercase mb-8 text-2xl tracking-wider font-semibold">
					Choose Your Category
				</h2>

				<div>
					<div className="flex justify-between flex-row mb-28">
						{cardDetails.map((cardDetail) => (
							<CategoryCard
								key={cardDetail.id}
								id={cardDetail.id}
								src={cardDetail.src}
								alt={cardDetail.alt}
								link={cardDetail.link}
								heading={cardDetail.heading}
								caption={cardDetail.caption}
							/>
						))}
					</div>
				</div>
				<h2 className="text-center uppercase mb-8 text-2xl tracking-wider font-semibold">
					Everything Kente
				</h2>
				<p className="px-10 mb-10">
					Your Graduation Gown, Professional Barristers Wig, Reliant
					Clergy Shirt and more, are made to traditional
					specifications providing you with the original fit you would
					expect. What makes us even different is the sustainability
					of our service.
				</p>

				<div className="flex flex-row gap-20 mb-20">
					<img
						className="w-2/5 aspect-square"
						src="src/assets/capture_experience.jpg"
						alt=""
					/>
					<div>
						<h2 className="uppercase font-semibold text-4xl mb-10 tracking-wide">
							Not Just A Product But An Experience
						</h2>
						<p className="mb-40">
							Your Graduation Gown, Professional Barristers Wig,
							Reliant Clergy Shirt and more, are made to
							traditional specifications providing you with the
							original fit you would expect. What makes us even
							different is the sustainability of our service.
						</p>
						<button className="bg-black px-4 py-2 rounded-lg border text-white max-w-md">
							Get Your Kente
						</button>
					</div>
				</div>

				<div className="flex flex-row gap-20 mb-40">
					<div>
						<h2 className="uppercase font-semibold text-4xl mb-10 tracking-wide">
							Celebrate Your Graduation In Style
						</h2>
						<p className="mb-40">
							Your Graduation Gown, Professional Barristers Wig,
							Reliant Clergy Shirt and more, are made to
							traditional specifications providing you with the
							original fit you would expect. What makes us even
							different is the sustainability of our service.
						</p>
						<button className="bg-black px-4 py-2 rounded-lg border text-white max-w-md">
							Get Your Custom Stole
						</button>
					</div>
					<img
						className="w-2/5 aspect-square"
						src="src/assets/celebrate_kente.jpg"
						alt=""
					/>
				</div>
				<div className="flex flex-col">
					<p className="block text-center mb-4">
						Receive exclusive promotions, private sales and news
					</p>
					<input
						type="text"
						className="block w-1/3 mx-auto border-b-slate-950 border-b-2 focus:outline-none focus:border-b-2 focus:border-black mb-4"
						placeholder="Enter your email address"
					/>
					<button className="bg-black px-2 py-2 rounded-lg border text-white mx-auto w-1/3 mb-8">
						Subscribe
					</button>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default HomePage;
