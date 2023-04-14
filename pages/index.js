import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import useTrackLocation from "../hooks/use-track-location";
import { ACTION_TYPES, StoreContext } from "../store/store-context";
import { fetchCoffeeStores } from "../lib/coffee-stores";

export async function getStaticProps(context) {
	const coffeeStores = await fetchCoffeeStores();
	return {
		props: { coffeeStores },
	};
}

const Home = ({ coffeeStores }) => {
	const [coffeeStoreError, setCoffeeStoreError] = useState(null);
	const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
		useTrackLocation();
	const { dispatch, state } = useContext(StoreContext);
	const { coffeeStores: coffeeStoresNearMe, latLong } = state;

	const handleOnBannerBtnClick = () => {
		console.log("Hi banner button");
		handleTrackLocation();
	};

	const fetchCoffeeStoresByCoords = useCallback(async (latLong, limit) => {
		try {
			const response = await fetch(
				`/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=${limit}`
			);
			const coffeeStores = await response.json();
			dispatch({
				type: ACTION_TYPES.SET_COFFEE_STORES,
				payload: {
					coffeeStores,
				},
			});
			setCoffeeStoreError("");
		} catch (error) {
			setCoffeeStoreError(error.message);
		}
	}, []);

	useEffect(() => {
		if (latLong) {
			fetchCoffeeStoresByCoords(latLong, 30);
		}
	}, [latLong, fetchCoffeeStoresByCoords]);

	return (
		<div className={styles.container}>
			<Head>
				<title>Coffee Connoisseur</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<Banner
					buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
					handleOnClick={handleOnBannerBtnClick}
				/>
				{locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
				{coffeeStoreError && <p>Something went wrong: {coffeeStoreError}</p>}
				<div className={styles.heroImage}>
					<Image
						src="/static/hero-image.png"
						width={700}
						height={400}
						alt="hero image"
						priority
					/>
				</div>
				{coffeeStoresNearMe.length > 0 && (
					<div className={styles.sectionWrapper}>
						<h2 className={styles.heading2}>Stores near me</h2>
						<div className={styles.cardLayout}>
							{coffeeStoresNearMe.map((store) => (
								<Card
									key={store.id}
									name={store.name}
									imgUrl={
										store.imgUrl ||
										"https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
									}
									href={`/coffee-store/${store.id}`}
									className={styles.card}
								/>
							))}
						</div>
					</div>
				)}
				{coffeeStores.length > 0 && (
					<div className={styles.sectionWrapper}>
						<h2 className={styles.heading2}>Toronto stores</h2>
						<div className={styles.cardLayout}>
							{coffeeStores.map((store) => (
								<Card
									key={store.id}
									name={store.name}
									imgUrl={
										store.imgUrl ||
										"https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
									}
									href={`/coffee-store/${store.id}`}
									className={styles.card}
								/>
							))}
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default Home;
