/**
 * The GraduationStoles function renders a list of ProductCard components and a button that redirects
 * to a website when clicked.
 * @returns The GraduationStoles component is returning a JSX fragment. It includes a div with the
 * className "fluid-grid" that maps over the PRODUCTS array and renders a ProductCard component for
 * each product.
 */
import { PRODUCTS } from "../utils/data";
import { ProductCard } from "../components/ProductCard";

export default function GraduationStoles() {
	const handleButtonClick = () => {
		window.location.href =
			"https://6576593962d11507416a7e96--spiffy-phoenix-61e583.netlify.app/";
	};
	return (
		<>
			<div className="fluid-grid">
				{PRODUCTS.map((product) => (
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
