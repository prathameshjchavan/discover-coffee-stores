import localFont from "next/font/local";
import "../styles/globals.css";
import { createContext } from "react";

const IBMPlexSans = localFont({
	src: [
		{ path: "../public/fonts/IBMPlexSans-Regular.ttf" },
		{ path: "../public/fonts/IBMPlexSans-Bold.ttf" },
		{ path: "../public/fonts/IBMPlexSans-SemiBold.ttf" },
	],
});

const StoreContext = createContext();
const initialState = {
	latLong: "",
	coffeeStores: [],
};

function MyApp({ Component, pageProps }) {
	return (
		<div className={IBMPlexSans.className}>
			<StoreContext.Provider value={initialState}>
				<Component {...pageProps} />
			</StoreContext.Provider>
		</div>
	);
}

export default MyApp;
