import { PRODUCTS } from "../utils/data";
import { NavLink } from "react-router-dom";
import heroImage from "../assets/hero_page_img.png";

const CheckOut = () => {
	return (
		<div className="max-w-screen-md mx-auto p-8 row">
			<div className="col-md-4 image">
				<img
					className="object-cover w-full h-48"
					src={heroImage}
					alt="Woven Kente Graduation Stole"
				/>
			</div>
			<main className="col-md-8">
				<header>
					<h1 className="text-2xl font-bold">
						Woven Kente Graduation Stole
					</h1>
					<p className="text-gray-600">
						Graduation Stoles, Gifts, and Decoration
					</p>
				</header>
				<section className="product">
					<h2 className="text-2xl font-semibold mt-4">$ 300</h2>
					{/* <p className="text-gray-600">
            This beautifully woven kente graduation stole is the perfect way to
            celebrate your graduation day. It is made from high-quality materials.
          </p> */}
					<div className="pt-4 sizes">
						<div className="text-gray-600">size</div>
						<button className="btn bg-white-500 text-black mt-2 mr-1">
							2-Yards
						</button>
						<button className="btn bg-white-500 text-black mt-2 mr-1">
							4-Yards
						</button>
						<button className="btn bg-white-500 text-black mt-2 mr-1">
							6-Yards
						</button>
						<button className="btn bg-white-500 text-black mt-2">
							8-Yards
						</button>
					</div>
					<div className="pt-4 pd-0">
						<button className="btn text-black mt-4 wishlist">
							Wishlist 💟
						</button>
					</div>
					<div className="pt-4">
						<div className="text-gray-600">Quantity</div>
						<div className="row">
							<div className="quantity-button col-md-4">
								<button id="decrement" className="btn">
									-
								</button>
								<input
									type="text"
									id="quantity"
									className="quantity-input"
									value="1"
								></input>
								<button id="increment" className="btn">
									+
								</button>
							</div>

							<NavLink to="/paystack" className="my-0.5 col-md-6">
								<button className="btn bg-black text-white mt-2">
									Add to Cart
								</button>
							</NavLink>
						</div>
					</div>
				</section>
			</main>

			<script src="../increment.js"></script>
		</div>
	);
};

export default CheckOut;
