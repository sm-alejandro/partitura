import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SongCard from "../components/SongCard";
import type { Song } from "../models/Song";
import ItemList from "./ItemList";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function Songs() {
	const [songs, setSongs] = useState<Song[]>([]);
	const query = useQuery().get("query") || "";

	useEffect(() => {
		const url = new URL("/api/songs", window.location.origin);
		if (query) {
			url.searchParams.append("query", query);
		}

		fetch(url.toString())
			.then((response) => response.json())
			.then((data) => setSongs(data))
			.catch((err) => console.error("Failed to fetch songs:", err));
	}, [query]);

	return (
		<ItemList
			items={songs}
			CardComponent={SongCard}
			header={`All Songs ${query ? "- Search: " + query : ""}`}
		/>
	);
}

export default Songs;
