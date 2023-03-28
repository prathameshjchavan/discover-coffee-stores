import { useRouter } from "next/router";

const CoffeeStore = () => {
	const router = useRouter();
	const { id } = router.query;

	return <div>Coffee Store Page {id}</div>;
};

export default CoffeeStore;
