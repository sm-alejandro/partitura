import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Stack, Title } from "@mantine/core";
import CategoryCard from "./CategoryCard";
import AnimatedLayout from "../shared/AnimatedLayout";
import ItemList from "../shared/ItemList";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function Categories() {
	const [items, setItems] = useState<any[]>([]);
	const query = useQuery().get("query") || "";

	useEffect(() => {
		const url = new URL("/api/categories", window.location.origin);
		if (query) {
			url.searchParams.append("query", query);
		}

		fetch(url.toString())
			.then((response) => response.json())
			.then((data) => setItems(data))
			.catch((err) => console.error("Failed to fetch data:", err));
	}, [query]);

	return (
		<AnimatedLayout>
			<Stack>
				<Title order={1}>All categories</Title>
				<ItemList
					items={items}
					cols={4}
					header=""
					CardComponent={CategoryCard}
				/>
			</Stack>
		</AnimatedLayout>
	);
}

export default Categories;
