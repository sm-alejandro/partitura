import { Notification } from "@mantine/core";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Author } from "../../models/Author";
import type { Category } from "../../models/Category";
import { IconX, IconCheck } from "@tabler/icons-react";
import type { Playlist } from "../../models/Playlist";
import type { Song } from "../../models/Song";
import AuthorCard from "../authors/AuthorCard";
import CategoryCard from "../categories/CategoryCard";
import { Button, Group, Select, Stack, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import AnimatedLayout from "../shared/AnimatedLayout";

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

			notifications.show({
				title: "Done",
				message: "The song has been added to the playlist",
			});
		} catch (err) {
			notifications.show({
				title: "Oops!",
				color: "red",
				message:
					"There has been an error adding the song to the playlist",
			});
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
		<AnimatedLayout>
			<Stack justify="flex-start" gap="xl">
				<Title order={1}>(Song) {song.title}</Title>
				<Group>
					{author ? <AuthorCard item={author} /> : "no author"}
					{category ? (
						<CategoryCard item={category} />
					) : (
						"no category"
					)}
				</Group>
				<Stack>
					<h3 className="text-2xl">Files</h3>

					{files?.map((file) => (
						<Button
							variant="filled"
							key={file}
							onClick={() => handlePDFClick(file)}
						>
							{file.substring(file.lastIndexOf("/") + 1)}
						</Button>
					))}
				</Stack>
				<Group align="end">
					<Select
						label="Add to Playlist:"
						placeholder="Choose playlist"
						data={playlists.map((p: Playlist) => {
							return { label: p.name, value: p.id.toString() };
						})}
						maxDropdownHeight={200}
						onChange={(_value, option) => {
							setSelectedPlaylistId(Number(option.value));
						}}
					/>
					<Button onClick={handleAddToPlaylist}>Submit</Button>
				</Group>
			</Stack>
		</AnimatedLayout>
	);
}

export default SongDetail;
