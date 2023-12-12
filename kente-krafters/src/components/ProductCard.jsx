/**
 * The `ProductCard` function is a React component that renders a card displaying product information
 * such as name, description, price, and trader.
 * @returns The ProductCard component is returning a JSX element, which represents the structure and
 * content of the product card.
 */
export function ProductCard({
	id,
	product_name,
	description,
	price,
	thumb,
	currency,
	trader,
}) {
	return (
		<div className="rounded-lg  bg-card text-card-foreground  w-[334px]">
			<div className="flex flex-col space-y-1.5">
				<img
					src={thumb}
					alt={product_name}
					className="w-full h-auto object-cover"
					width="334"
					height="340"
					style={{
						aspectRatio: "334 / 220",
						objectFit: "cover",
					}}
				/>
				{/* <div className="absolute top-4 right-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="text-white"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
          </svg>
        </div> */}
			</div>
			<div className="py-3">
				<div className="text-sm text-gray-500">New in</div>
				<div className="text-lg font-bold">
					{product_name} by {trader}
				</div>
				<div className="text-sm text-gray-500">
					Available in different colors
				</div>
				<div className="text-lg font-bold">
					{currency} {price}
				</div>
			</div>
		</div>
	);
}
