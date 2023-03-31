import Link from "next/link";
import { useRouter } from "next/router";
import coffeeStoresData from "../../data/coffee-stores.json";
import Head from "next/head";

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

	const { address, name, neighbourhood } = coffeeStore;

	return (
		<div>
			<Head>
				<title>{name}</title>
			</Head>
			<Link href="/">Back to home</Link>
			<p>{address}</p>
			<p>{name}</p>
			<p>{neighbourhood}</p>
		</div>
	);
};

export default CoffeeStore;
