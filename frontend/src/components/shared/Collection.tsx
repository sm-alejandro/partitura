import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "@mantine/core";
import ItemList from "./ItemList";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

interface CollectionProps {
	collection: string;
	CardComponent: React.ComponentType<{ item: any }>;
}

function Collection({ collection, CardComponent }: CollectionProps) {
	const [items, setItems] = useState<any[]>([]);
	const query = useQuery().get("query") || "";

	useEffect(() => {
		const url = new URL(`/api/${collection}`, window.location.origin);
		if (query) {
			url.searchParams.append("query", query);
		}

		fetch(url.toString())
			.then((response) => response.json())
			.then((data) => setItems(data))
			.catch((err) => console.error("Failed to fetch data:", err));
	}, [query, collection]);

	return <ItemList items={items} header="" CardComponent={CardComponent} />;
}

export default Collection;
