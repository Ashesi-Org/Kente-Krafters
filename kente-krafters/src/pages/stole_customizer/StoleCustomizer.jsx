import Sidebar from "../../components/Sidebar";

const StoleCustomizer = () => {
	return (
		<div className="flex h-screen">
			<Sidebar />
			<div className="flex-1 bg-gray-200 p-4">
				{/* Main content goes here */}
				<h1>Main Content</h1>
			</div>
		</div>
	);
};

export default StoleCustomizer;
