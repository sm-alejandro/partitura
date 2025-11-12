import { Link } from "react-router-dom";
import type { Author } from "../../models/Author";

export default function AuthorCard({ item }: { item: Author }) {
	return (
		<Link
			to={`/authors/${item.id}`}
			className="flex w-full items-center space-x-2 p-4 rounded-lg shadow-lg bg-gray-800 transition-transform transform hover:scale-105"
		>
			<img
				src={item.image}
				alt={"profile"}
				className="w-12 h-12 rounded-full object-cover"
			/>
			<span className="text-lg font-semibold">{item.name}</span>
		</Link>
	);
}
