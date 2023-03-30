import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";
import coffeeStoresData from "../data/coffee-stores.json";
import { Fragment } from "react";

export async function getStaticProps(context) {
	return {
		props: { coffeeStores: coffeeStoresData },
	};
}

const Home = ({ coffeeStores }) => {
	const handleOnBannerBtnClick = () => {
		console.log("Hi banner button");
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Coffee Connoisseur</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<Banner
					buttonText="View stores nearby"
					handleOnClick={handleOnBannerBtnClick}
				/>
				<div className={styles.heroImage}>
					<Image
						src="/static/hero-image.png"
						width={700}
						height={400}
						alt="hero image"
						priority
					/>
				</div>
				{coffeeStores.length > 0 && (
					<Fragment>
						<h2 className={styles.heading2}>Toronto stores</h2>
						<div className={styles.cardLayout}>
							{coffeeStores.map((store) => (
								<Card
									key={store.id}
									name={store.name}
									imgUrl={store.imgUrl}
									href={`/coffee-store/${store.id}`}
									className={styles.card}
								/>
							))}
						</div>
					</Fragment>
				)}
			</main>
		</div>
	);
};

export default Home;
