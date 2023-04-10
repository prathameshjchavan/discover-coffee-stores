import localFont from "next/font/local";
import "../styles/globals.css";
import StoreProvider from "../store/store-context";

const IBMPlexSans = localFont({
	src: [
		{ path: "../public/fonts/IBMPlexSans-Regular.ttf" },
		{ path: "../public/fonts/IBMPlexSans-Bold.ttf" },
		{ path: "../public/fonts/IBMPlexSans-SemiBold.ttf" },
	],
});

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
