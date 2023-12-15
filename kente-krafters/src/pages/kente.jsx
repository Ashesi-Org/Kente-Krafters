import { useState, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { baseEndPoint } from "../../expressAPI/data";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function KenteShopping() {
	const handleButtonClick = () => {
		window.location.href = "https://sfv86m.csb.app/";
	};

	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get(baseEndPoint);
				setProducts(response.data);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	return (
		<>
			<div className="fluid-grid">
				{products.map((product) => (
					<NavLink
						key={product.product_id}
						to={`/checkout/${product.product_id}`}
					>
						<ProductCard key={product.product_id} {...product} />
					</NavLink>
				))}
			</div>
			<div className="flex justify-center mt-20">
				<button
					className="bg-black text-white px-10 py-3 "
					onClick={handleButtonClick}
				>
					Create your own style
				</button>
			</div>
		</>
	);
}
