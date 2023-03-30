import Link from "next/link";
import { useRouter } from "next/router";
import coffeeStoresData from "../../data/coffee-stores.json";

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
	return {
		paths: [
			{ params: { id: "0" } },
			{ params: { id: "1" } },
			{ params: { id: "300" } },
		],
		fallback: false,
	};
}

const CoffeeStore = ({ coffeeStore }) => {
	const router = useRouter();
	const { id } = router.query;

	return (
		<div>
			<p>Coffee Store Page {id}</p>
			<Link href="/">Back to home</Link>
			<p>{coffeeStore.address}</p>
			<p>{coffeeStore.name}</p>
		</div>
	);
};

export default CoffeeStore;
