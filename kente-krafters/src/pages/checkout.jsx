/**
 * The CheckOut component is a React component that displays information about a product and allows the
 * user to select the size and quantity of the product and add it to their cart.
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { baseEndPoint } from "../../expressAPI/data";

const CheckOut = () => {
	// get the product id from the header parameters from the url
	const productId = window.location.pathname.split("/")[2];
	// get the product data from the backend
	const [product, setProduct] = useState({});
	useEffect(() => {
		// fetch the product data from the backend
		const fetchProduct = async () => {
			try {
				const response = await axios.get(
					`${baseEndPoint}product/${productId}`
				);
				const responseData =
					typeof response.data === "string"
						? JSON.parse(response.data)
						: response.data;
				setProduct(responseData);
			} catch (error) {
				console.error("Error fetching product:", error);
			}
		};

		fetchProduct();
	}, [productId]); // Only include productId in the dependency array, not product

	return (
		<div className="max-w-screen-md mx-auto p-8 row">
			<div className="col-md-4 image">
				{product && (
					<img
						className="object-cover w-full h-48"
						src={product[0].image_link}
						alt={product[0].name}
					/>
				)}
			</div>
			<main className="col-md-8">
				<header>
					<h1 className="text-2xl font-bold">
						{product && product[0].product_name}
					</h1>
					<p className="text-gray-600">
						Graduation Stoles, Gifts, and Decoration
					</p>
				</header>
				<section className="product">
					<h2 className="text-2xl font-semibold mt-4">
						$ {product && product[0].price}
					</h2>
					<p className="text-gray-600">
						{product && product[0].description}
					</p>
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
									defaultValue="1"
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

			<script src="src/increment.js"></script>
		</div>
	);
};

export default CheckOut;
