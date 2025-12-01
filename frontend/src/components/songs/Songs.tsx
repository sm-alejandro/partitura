import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Stack, Title } from "@mantine/core";
import SongCard from "./SongCard";
import ItemList from "../shared/ItemList";
import AnimatedLayout from "../shared/AnimatedLayout";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function Songs() {
	const [items, setItems] = useState<any[]>([]);
	const query = useQuery().get("query") || "";

	useEffect(() => {
		const url = new URL("/api/songs", window.location.origin);
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
				<Title order={1}>All songs</Title>
				<ItemList
					items={items}
					cols={5}
					header=""
					CardComponent={SongCard}
				/>
			</Stack>
		</AnimatedLayout>
	);
}

export default Songs;
