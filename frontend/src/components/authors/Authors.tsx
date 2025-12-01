import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Stack, Title } from "@mantine/core";
import AuthorCard from "./AuthorCard";
import ItemList from "../shared/ItemList";
import AnimatedLayout from "../shared/AnimatedLayout";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function Authors() {
	const [items, setItems] = useState<any[]>([]);
	const query = useQuery().get("query") || "";

	useEffect(() => {
		const url = new URL("/api/authors", window.location.origin);
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
				<Title order={1}>All authors</Title>
				<ItemList
					items={items}
					cols={3}
					header=""
					CardComponent={AuthorCard}
				/>
			</Stack>
		</AnimatedLayout>
	);
}

export default Authors;
