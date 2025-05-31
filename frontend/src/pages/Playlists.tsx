import { useEffect, useState } from "react";
import type { Playlist } from "../models/Playlist";
import ItemList from "./ItemList";
import PlaylistCard from "../components/Playlist";

export default function Playlists() {
	const [playlists, setPlaylists] = useState<Playlist[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	async function fetchCategories() {
		try {
			const response = await fetch("/api/playlists");
			if (!response.ok) throw new Error("Network response was not ok");
			const data: Playlist[] = await response.json();
			setPlaylists(data);
		} catch (err) {
			setError("Failed to load playlists");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchCategories();
	}, []);

	const createPlaylist = async () => {
		const name = prompt("Enter the name of the new playlist:");
		if (name) {
			try {
				const response = await fetch("/api/playlists", {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: new URLSearchParams({ name }),
				});
				if (!response.ok) throw new Error("Failed to create playlist");
				fetchCategories();
			} catch (err) {
				setError("Failed to create playlist");
			}
		}
	};

	if (loading) return <p className="text-white p-6">Loading playlists...</p>;
	if (error) return <p className="text-red-500 p-6">{error}</p>;

	return (
		<>
			<ItemList
				items={playlists}
				CardComponent={PlaylistCard}
				header={`All Playlists (${playlists.length})`}
			/>
			<div className="flex justify-center mt-6">
				<button
					onClick={createPlaylist}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-200"
				>
					New Playlist
				</button>
			</div>
		</>
	);
}
