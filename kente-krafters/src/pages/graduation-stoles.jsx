import { PRODUCTS } from "../utils/data";
import { ProductCard } from "../components/ProductCard";

export default function GraduationStoles() {
  const handleButtonClick = () => {
    // Replace the following URL with the actual URL you want to navigate to
    window.location.href = 'https://6576593962d11507416a7e96--spiffy-phoenix-61e583.netlify.app/';
  };
  return (
    
    <>
    
      <div className="fluid-grid">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      <div className="flex justify-center mt-20">
      <button className="bg-black text-white px-10 py-3" onClick={handleButtonClick}>
      Create your own style
    </button>
      </div>
    </>
  );
}
