/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "1rem",
		},
		extend: {
			colors: {
				// this is the color from the logo
				"logo-gray": "#48484a",
			},
		},
	},
	plugins: [],
};
