import { useState } from "react";

const Cart = () => {
	const [quantity, setQuantity] = useState(1);
	const [selectedSize, setSelectedSize] = useState("2-Yards"); // Default size
	const [cart, setCart] = useState([]);

	const handleSizeChange = (size) => {
		setSelectedSize(size);
	};

	const handleQuantityChange = (amount) => {
		setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
	};

	const handleDeleteFromCart = (productId) => {
		console.log("Deleting product with ID:", productId);

		const updatedCart = cart.filter((product) => product.id !== productId);
		console.log("Updated Cart:", updatedCart);

		setCart(updatedCart);
	};

	const handleAddToCart = (product) => {
		const updatedCart = [
			...cart,
			{
				id: product.id,
				name: product.name,
				price: product.price,
				quantity,
				size: selectedSize,
			},
		];
		setCart(updatedCart);
		// Clear quantity for the next product
		setQuantity(1);
	};

	const calculateTotal = () => {
		return cart.reduce(
			(total, product) => total + product.price * product.quantity,
			0
		);
	};

	const products = [
		{
			id: 1,
			name: "Woven Kente Graduation Stole",
			price: 300,
			imageSrc: "heroImage1", // Replace with your actual image source
		},
		{
			id: 2,
			name: "Product 2",
			price: 150,
			imageSrc: "heroImage2", // Replace with your actual image source
		},
		{
			id: 3,
			name: "Product 3",
			price: 200,
			imageSrc: "heroImage3", // Replace with your actual image source
		},
	];

	return (
		<div className="max-w-screen-md mx-auto p-8">
			{products.map((product) => (
				<div
					key={product.id}
					className="flex items-center justify-between mb-8"
				>
					<div className="image">
						<img
							className="object-cover w-32 h-32"
							src={product.imageSrc}
							alt={product.name}
						/>
					</div>
					<div className="product-details ml-8">
						<div>
							<h1 className="text-xl font-bold">
								{product.name}
							</h1>
							<p className="text-gray-600">
								Size: {selectedSize}
							</p>
						</div>
						<div className="flex items-center mt-4">
							<div className="text-gray-600">Quantity</div>
							<div className="quantity-button ml-2">
								<button
									className="btn"
									onClick={() => handleQuantityChange(-1)}
								>
									-
								</button>
								<input
									type="text"
									id="quantity"
									className="quantity-input"
									value={quantity}
									readOnly
								/>
								<button
									className="btn"
									onClick={() => handleQuantityChange(1)}
								>
									+
								</button>
							</div>
						</div>
					</div>
					<div className="price-and-button ml-8">
						<div className="text-xl font-semibold">
							${product.price}
						</div>
						<button
							className="btn bg-red-500 text-white text-xs p-1 rounded-full focus:outline-none"
							onClick={() => handleDeleteFromCart(product.id)}
						>
							Delete
						</button>
					</div>
				</div>
			))}
			{/* Total Display */}
			<div className="flex items-center justify-between mt-8">
				<div className="text-xl font-bold">Total:</div>
				<div className="text-xl font-semibold">${calculateTotal()}</div>
			</div>
			{/* Single "Pay Now" Button */}
			<div className="mt-8">
				<button
					className="btn bg-black text-white"
					onClick={() => alert("Payment logic for all products here")}
				>
					Pay Now
				</button>
			</div>
		</div>
	);
};

export default Cart;
