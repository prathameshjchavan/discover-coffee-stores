import localFont from "next/font/local";
import "../styles/globals.css";
import { createContext, useReducer } from "react";

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
const ACTION_TYPES = {
	SET_LAT_LONG: "SET_LAT_LONG",
	SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

const storeReducer = (state, action) => {
	switch (action.type) {
		case ACTION_TYPES.SET_LAT_LONG:
			return { ...state, latLong: action.payload.latLong };
		case ACTION_TYPES.SET_COFFEE_STORES:
			return { ...state, coffeeStores: action.payload.coffeeStores };
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

function MyApp({ Component, pageProps }) {
	const [state, dispatch] = useReducer(storeReducer, initialState);

	return (
		<div className={IBMPlexSans.className}>
			<StoreContext.Provider value={{ state, dispatch }}>
				<Component {...pageProps} />
			</StoreContext.Provider>
		</div>
	);
}

export default MyApp;
