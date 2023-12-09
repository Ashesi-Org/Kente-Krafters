import PropTypes from "prop-types";

const CategoryCard = ({ id, link, src, alt, heading, caption }) => {
	return (
		<div className="w-96 flex ">
			<a key={id} href={link}>
				<div className="">
					<img
						src={src}
						alt={alt}
						className="flex-1 rounded overflow-hidden shadow-lg mb-10 h-80 w-96"
					/>
					<h2 className="text-center text-black font-bold">
						{heading}
					</h2>
					<p className="">{caption}</p>
				</div>
			</a>
		</div>
	);
};

CategoryCard.propTypes = {
	id: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	heading: PropTypes.string.isRequired,
	caption: PropTypes.string.isRequired,
};

export default CategoryCard;
