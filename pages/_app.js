import localFont from "next/font/local";
import "../styles/globals.css";

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
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;
