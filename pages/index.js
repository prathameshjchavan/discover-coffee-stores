import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";
import coffeeStores from "../data/coffee-stores.json";

export async function getStaticProps(context) {
	return {
		props: { coffeeStores },
	};
}

const Home = (props) => {
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
				<div className={styles.cardLayout}>
					{props.coffeeStores.map((store) => (
						<Card
							key={store.id}
							name={store.name}
							imgUrl={store.imgUrl}
							href={`/coffee-store/${store.id}`}
							className={styles.card}
						/>
					))}
				</div>
			</main>
		</div>
	);
};

export default Home;
