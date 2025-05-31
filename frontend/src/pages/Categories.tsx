import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import type { Category } from "../models/Category";
import ItemList from "./ItemList";

export default function Categories() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchCategories() {
			try {
				const response = await fetch("/api/categories");
				if (!response.ok)
					throw new Error("Network response was not ok");
				const data: Category[] = await response.json();
				console.log(data);
				setCategories(data);
			} catch (err) {
				setError("Failed to load categories");
			} finally {
				setLoading(false);
			}
		}
		fetchCategories();
	}, []);

	if (loading) return <p className="text-white p-6">Loading categories...</p>;
	if (error) return <p className="text-red-500 p-6">{error}</p>;

	return (
		<ItemList
			items={categories}
			CardComponent={CategoryCard}
			header={"All Categories"}
		/>
	);
}
