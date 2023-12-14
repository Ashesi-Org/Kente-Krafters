import { useState, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import { baseEndPoint } from "../../expressAPI/data";
import axios from "axios";

export default function GraduationStoles() {
	const handleButtonClick = () => {
		window.location.href =
			"https://6576593962d11507416a7e96--spiffy-phoenix-61e583.netlify.app/";
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
					<ProductCard key={product.id} {...product} />
				))}
			</div>
			<div className="flex justify-center mt-20">
				<button
					className="bg-black text-white px-10 py-3"
					onClick={handleButtonClick}
				>
					Create your own style
				</button>
			</div>
		</>
	);
}
