import Link from "next/link";
import { useRouter } from "next/router";

const CoffeeStore = () => {
	const router = useRouter();
	const { id } = router.query;

	return (
		<div>
			<p>Coffee Store Page {id}</p>
			<Link href="/">Back to home</Link>
		</div>
	);
};

export default CoffeeStore;
