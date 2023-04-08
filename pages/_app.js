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
export const StoreContext = createContext();

export const ACTION_TYPES = {
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

const StoreProvider = ({ children }) => {
	const initialState = {
		latLong: "",
		coffeeStores: [],
	};

	const [state, dispatch] = useReducer(storeReducer, initialState);

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
};

function MyApp({ Component, pageProps }) {
	return (
		<div className={IBMPlexSans.className}>
			<StoreProvider>
				<Component {...pageProps} />
			</StoreProvider>
		</div>
	);
}

export default MyApp;
