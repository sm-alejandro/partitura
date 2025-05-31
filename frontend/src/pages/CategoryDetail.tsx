import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Song } from "../models/Song";
import type { Category } from "../models/Category";
import ItemList from "./ItemList";
import SongCard from "../components/SongCard";

function Songs() {
	const { id } = useParams<{ id: string }>();
	const [songs, setSongs] = useState<Song[]>([]);
	const [category, setCategory] = useState<Category | null>(null);

	useEffect(() => {
		const url = new URL(`/api/categories/${id}`, window.location.origin);

		fetch(url.toString())
			.then((response) => response.json())
			.then((data) => setCategory(data))
			.catch((err) => console.error("Failed to fetch category:", err));
		const url2 = new URL(
			`/api/categories/${id}/songs`,
			window.location.origin
		);

		fetch(url2.toString())
			.then((response) => response.json())
			.then((data) => setSongs(data))
			.catch((err) => console.error("Failed to fetch category:", err));
	}, []);

	return (
		<ItemList
			items={songs}
			CardComponent={SongCard}
			header={`All Songs in category ${category?.name}`}
		/>
	);
}

export default Songs;
