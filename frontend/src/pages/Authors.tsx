import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import AuthorCard from "../components/AuthorCard";
import type { Author } from "../models/Author";

export default function Authors() {
	const [authors, setAuthors] = useState<Author[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchAuthors() {
			try {
				const response = await fetch("/api/authors");
				if (!response.ok)
					throw new Error("Network response was not ok");
				const data: Author[] = await response.json();
				console.log(data);
				setAuthors(data);
			} catch (err) {
				setError("Failed to load categories");
			} finally {
				setLoading(false);
			}
		}
		fetchAuthors();
	}, []);

	if (loading) return <p className="text-white p-6">Loading authors...</p>;
	if (error) return <p className="text-red-500 p-6">{error}</p>;

	return (
		<ItemList
			items={authors}
			CardComponent={AuthorCard}
			header={"All Authors"}
		/>
	);
}
