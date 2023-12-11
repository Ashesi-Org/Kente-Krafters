import { PRODUCTS } from "../../utils/data";
import { ProductCard } from "../../components/ProductCard";

export default function GraduationStoles() {
	return (
		<>
			<div className="fluid-grid">
				{PRODUCTS.map((product) => (
					<ProductCard key={product.id} {...product} />
				))}
			</div>
			<div className="flex justify-center mt-20">
				<button className="bg-black text-white px-10 py-3 ">
					Create your own style
				</button>
			</div>
		</>
	);
}
