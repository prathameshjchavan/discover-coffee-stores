import Image from "next/image";
import Link from "next/link";

const Card = ({ name, imgUrl, href }) => {
	return (
		<Link href={href}>
			<h2>{name}</h2>
			<Image src={imgUrl} width={260} height={160} alt="name" />
		</Link>
	);
};

export default Card;
