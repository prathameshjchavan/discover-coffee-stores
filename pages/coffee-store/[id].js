import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../store/store-context";
import { isEmpty } from "../../utils";
import useSWR from "swr";

export async function getStaticProps(context) {
	const coffeeStores = await fetchCoffeeStores();
	const findCoffeeStoreById = coffeeStores.find(
		(coffeeStore) => coffeeStore.id.toString() === context.params.id
	);
	return {
		props: {
			coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
		},
	};
}

export async function getStaticPaths() {
	const coffeeStores = await fetchCoffeeStores();
	const paths = coffeeStores.map((coffeeStore) => {
		return { params: { id: coffeeStore.id.toString() } };
	});

	return {
		paths,
		fallback: true,
	};
}

const CoffeeStore = (props) => {
	const router = useRouter();
	const id = router.query.id;
	const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore);
	const [votingCount, setVotingCount] = useState(1);
	const {
		state: { coffeeStores },
	} = useContext(StoreContext);
	const fetcher = (url) => fetch(url).then((res) => res.json());
	const { data, error } = useSWR(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/getCoffeeStoreById?id=${id}`,
		fetcher
	);
	console.log(data);

	const handleCreateCoffeeStore = async (coffeeStore) => {
		try {
			const { id, name, imgUrl, location } = coffeeStore;
			const response = await fetch("/api/createCoffeeStore", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id,
					name,
					voting: 0,
					imgUrl,
					address: location.formatted_address || "",
					neighbourhood:
						location?.neighbourhood || location?.cross_street || "",
				}),
			});
			const dbCoffeeStore = await response.json();
			console.log({ dbCoffeeStore });
		} catch (error) {
			console.error("Error creating coffee store", err);
		}
	};

	useEffect(() => {
		if (isEmpty(props.coffeeStore)) {
			if (coffeeStores.length > 0) {
				const coffeeStoreFromContext = coffeeStores.find(
					(coffeeStore) => coffeeStore.id.toString() === id
				);

				if (coffeeStoreFromContext) {
					setCoffeeStore(coffeeStoreFromContext);
					handleCreateCoffeeStore(coffeeStoreFromContext);
				}
			}
		} else {
			handleCreateCoffeeStore(props.coffeeStore);
		}
	}, [id]);

	useEffect(() => {
		if (data && data.length > 0) {
			console.log("data from SWR >> ", data);
			setCoffeeStore(data[0]);
		}
	}, [data]);

	const handleUpvoteButton = () => {
		console.log("handle upvote");
		setVotingCount((count) => count + 1);
	};

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Something went wrong retrieving coffee store page</div>;
	}

	return (
		<div className={styles.layout}>
			<Head>
				<title>{coffeeStore?.name}</title>
			</Head>
			<div className={styles.container}>
				<div className={styles.col1}>
					<div className={styles.backToHomeLink}>
						<Link href="/">← Back to home</Link>
					</div>
					<div className={styles.nameWrapper}>
						<h1 className={styles.name}>{coffeeStore?.name}</h1>
					</div>
					<div className={styles.storeImgWrapper}>
						<Image
							src={
								coffeeStore?.imgUrl ||
								"https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
							}
							width={600}
							height={360}
							alt={coffeeStore?.name || "store image"}
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
						<p className={styles.text}>
							{coffeeStore?.location?.formatted_address}
						</p>
					</div>
					{(coffeeStore?.location?.neighborhood ||
						coffeeStore?.location?.cross_street) && (
						<div className={styles.iconWrapper}>
							<Image
								src="/static/icons/nearMe.svg"
								width={24}
								height={24}
								alt="near me"
							/>
							<p className={styles.text}>
								{coffeeStore?.location?.neighborhood ||
									coffeeStore?.location?.cross_street}
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
						<p className={styles.text}>{votingCount}</p>
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
