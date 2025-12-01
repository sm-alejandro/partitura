import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Playlist } from "../../models/Playlist";
import type { Song } from "../../models/Song";
import ItemList from "../shared/ItemList";
import SongCard from "../songs/SongCard";
import AnimatedLayout from "../shared/AnimatedLayout";

function PlaylistDetail() {
	const { id } = useParams<{ id: string }>();
	const [songs, setSongs] = useState<Song[]>([]);
	const [playlist, setPlaylist] = useState<Playlist | null>(null);
	const navigate = useNavigate(); // Initialize useNavigate

	useEffect(() => {
		const url = new URL(`/api/playlists/${id}`, window.location.origin);

		fetch(url.toString())
			.then((response) => response.json())
			.then((data) => setPlaylist(data))
			.catch((err) => console.error("Failed to fetch playlist:", err));

		const url2 = new URL(
			`/api/playlists/${id}/songs`,
			window.location.origin
		);

		fetch(url2.toString())
			.then((response) => response.json())
			.then((data) => setSongs(data))
			.catch((err) => console.error("Failed to fetch songs:", err));
	}, [id]);

	const deletePlaylist = async () => {
		if (window.confirm("Are you sure you want to delete this playlist?")) {
			try {
				const response = await fetch(`/api/playlists/${id}`, {
					method: "DELETE",
				});
				if (!response.ok) throw new Error("Failed to delete playlist");
				navigate("/playlists"); // Redirect to the playlists page after deletion
			} catch (err) {
				console.error("Error deleting playlist:", err);
				alert("Failed to delete playlist");
			}
		}
	};

	return (
		<AnimatedLayout>
			<ItemList
				cols={5}
				items={songs}
				CardComponent={SongCard}
				header={`Songs in playlist ${playlist?.name}`}
			/>
			<div className="flex justify-center mt-6">
				<button
					onClick={deletePlaylist}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-200"
				>
					Delete Playlist
				</button>
			</div>
		</AnimatedLayout>
	);
}

export default PlaylistDetail;
