import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Author } from "../../models/Author";
import type { Category } from "../../models/Category";
import type { Playlist } from "../../models/Playlist";
import type { Song } from "../../models/Song";
import AuthorCard from "../authors/AuthorCard";
import CategoryCard from "../categories/CategoryCard";

function SongDetail() {
	const { id } = useParams<{ id: string }>();
	const [song, setSong] = useState<Song | null>(null);
	const [playlists, setPlaylists] = useState<Playlist[]>([]);
	const [author, setAuthor] = useState<Author | null>(null);
	const [category, setCategory] = useState<Category | null>(null);
	const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [submitMessage, setSubmitMessage] = useState<string | null>(null);
	const [files, setFiles] = useState<string[] | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const [songRes, playlistsRes] = await Promise.all([
					fetch(`/api/songs/${id}`),
					fetch("/api/playlists"),
				]);

				if (!songRes.ok) throw new Error("Failed to fetch song");
				if (!playlistsRes.ok)
					throw new Error("Failed to fetch playlists");

				const songData: Song = await songRes.json();
				const playlistsData: Playlist[] = await playlistsRes.json();
				setSong(songData);
				setPlaylists(playlistsData);
				// Song dependent
				const [authorRes, categoryRes] = await Promise.all([
					fetch(`/api/authors/${songData.author}`),
					fetch(`/api/categories/${songData.category}`),
				]);
				if (!authorRes.ok) throw new Error("Failed to fetch song");
				if (!categoryRes.ok)
					throw new Error("Failed to fetch playlists");
				const authorData: Author = await authorRes.json();
				const categoryData: Category = await categoryRes.json();
				setSelectedPlaylistId(playlistsData[0]?.id ?? null);
				setAuthor(authorData);
				setCategory(categoryData);
				const filesRes = await fetch(`/api/songs/${id}/files`);
				if (!filesRes.ok) throw new Error("Failed to fetch files");
				const filesData = await filesRes.json();
				setFiles(filesData);
			} catch (err) {
				setError((err as Error).message);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [id]);

	async function handleAddToPlaylist(e: FormEvent) {
		e.preventDefault();
		if (!selectedPlaylistId || !song) return;

		try {
			const res = await fetch(`/api/playlists/${selectedPlaylistId}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ song_id: song.id }),
			});
			if (!res.ok) throw new Error("Failed to add song to playlist");

			setSubmitMessage("Song added to playlist!");
		} catch (err) {
			setSubmitMessage(`Error: ${(err as Error).message}`);
		}
	}

	const navigate = useNavigate();

	const handleMusicXMLClick = (file: string) => {
		navigate(`/musicxml?file=${file}`);
	};

	const handlePDFClick = (file: string) => {
		const fileUrl = `/api/file?file=${encodeURIComponent(file)}`;
		window.open(fileUrl, "_blank");
	};

	if (loading) return <p className="text-white p-6">Loading...</p>;
	if (error) return <p className="text-red-500 p-6">{error}</p>;
	if (!song) return <p className="text-white p-6">Song not found</p>;

	return (
		<div className="min-h-screen text-white">
			<main className="container mx-auto p-6">
				{/* Header block */}
				<h1 className="text-4xl font-bold mb-4">{song.title}</h1>

				<div className="flex space-x-4 mb-4">
					{/* Author */}
					{author ? <AuthorCard item={author} /> : "no author"}
					{/* Category */}
					{category ? (
						<CategoryCard item={category} />
					) : (
						"no category"
					)}
				</div>
				<br />

				{/* Links */}
				<h3 className="text-2xl">Files</h3>

				{files?.map((file) => (
					<button
						key={file}
						onClick={() => handlePDFClick(file)}
						className="group mx-10 relative h-12 overflow-hidden overflow-x-hidden rounded-md bg-neutral-950 px-8 py-2 text-neutral-50"
					>
						<span className="relative z-10">
							{file.substring(file.lastIndexOf("/") + 1)}
						</span>
						<span className="absolute inset-0 overflow-hidden rounded-md">
							<span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-blue-500 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
						</span>
					</button>
				))}

				{/* Add to Playlist Form */}
				<form onSubmit={handleAddToPlaylist} className="mb-4 max-w-sm">
					<label
						htmlFor="playlist"
						className="block text-sm font-medium text-gray-300 mb-2"
					>
						Add to Playlist:
					</label>
					<select
						id="playlist"
						name="playlist_id"
						className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white mb-2"
						value={selectedPlaylistId ?? ""}
						onChange={(e) =>
							setSelectedPlaylistId(Number(e.target.value))
						}
					>
						{playlists.map((pl) => (
							<option key={pl.id} value={pl.id}>
								{pl.name}
							</option>
						))}
					</select>
					<button
						type="submit"
						className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Add Song
					</button>
				</form>

				{submitMessage && (
					<p
						className={`${
							submitMessage.startsWith("Error")
								? "text-red-500"
								: "text-green-500"
						}`}
					>
						{submitMessage}
					</p>
				)}
			</main>
		</div>
	);
}

export default SongDetail;
