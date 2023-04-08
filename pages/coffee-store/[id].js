import Link from "next/link";
import { useRouter } from "next/router";
import coffeeStoresData from "../../data/response.json";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";

export function getStaticProps(context) {
	return {
		props: {
			coffeeStore: coffeeStoresData.find(
				(coffeeStore) => coffeeStore.id.toString() === context.params.id
			),
		},
	};
}

export function getStaticPaths() {
	const paths = coffeeStoresData.map((coffeeStore) => {
		return { params: { id: coffeeStore.id.toString() } };
	});

	return {
		paths,
		fallback: true,
	};
}

const CoffeeStore = ({ coffeeStore }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	const { location, name, imgUrl } = coffeeStore;

	const handleUpvoteButton = () => {
		console.log("handle upvote");
	};

	return (
		<div className={styles.layout}>
			<Head>
				<title>{name}</title>
			</Head>
			<div className={styles.container}>
				<div className={styles.col1}>
					<div className={styles.backToHomeLink}>
						<Link href="/">← Back to home</Link>
					</div>
					<div className={styles.nameWrapper}>
						<h1 className={styles.name}>{name}</h1>
					</div>
					<div className={styles.storeImgWrapper}>
						<Image
							src={
								imgUrl ||
								"https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
							}
							width={600}
							height={360}
							alt={name}
							className={styles.storeImg}
						/>
					</div>
				</div>
				<div className={cls("glass", styles.col2)}>
					<div className={styles.iconWrapper}>
						<Image
							src="/static/icons/places.svg"
							width={24}
							height={24}
							alt="address"
						/>
						<p className={styles.text}>{location.formatted_address}</p>
					</div>
					{(location.neighborhood || location.cross_street) && (
						<div className={styles.iconWrapper}>
							<Image
								src="/static/icons/nearMe.svg"
								width={24}
								height={24}
								alt="near me"
							/>
							<p className={styles.text}>
								{location.neighborhood || location.cross_street}
							</p>
						</div>
					)}

					<div className={styles.iconWrapper}>
						<Image
							src="/static/icons/star.svg"
							width={24}
							height={24}
							alt="vote"
						/>
						<p className={styles.text}>1</p>
					</div>
					<button className={styles.upvoteButton} onClick={handleUpvoteButton}>
						Up vote!
					</button>
				</div>
			</div>
		</div>
	);
};

export default CoffeeStore;
