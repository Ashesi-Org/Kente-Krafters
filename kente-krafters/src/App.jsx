import HomePage from "./pages/homepage/HomePage";
import { Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import KenteShopping from "./pages/kente";
import AboutUs from "./pages/AboutUs";
import ValuesAndVisions from "./pages/Values-visions";
import CheckOut from "./pages/checkout";
import PaystackIntegration from "./pages/paystack";
import Landing from "./pages/welcome";

export default function App() {
	return (
		<Routes>
			<Route path="/">
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Route>
			<Route path="/" element={<Layout />}>
				<Route index element={<Landing />} />
				<Route path="kente" element={<KenteShopping />} />
				<Route path="AboutUs" element={<AboutUs />} />
				<Route path="Values-visions" element={<ValuesAndVisions />} />
				<Route path="checkout/:orderID" element={<CheckOut />} />
				<Route path="paystack" element={<PaystackIntegration />} />
				<Route path="welcome" element={<Landing />} />
				<Route path="HomePage" element={<HomePage />} />
			</Route>
		</Routes>
	);
}

function Layout() {
	return (
		<div>
			<Navbar />

			<div className="container py-10">
				<Outlet />
			</div>

			<Footer />
		</div>
	);
}
