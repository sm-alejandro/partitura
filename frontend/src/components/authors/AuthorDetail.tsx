import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Song } from "../../models/Song";
import SongCard from "../songs/SongCard";
import type { Author } from "../../models/Author";
import ItemList from "../shared/ItemList";
import { Stack, Title } from "@mantine/core";
import AnimatedLayout from "../shared/AnimatedLayout";

function AuthorDetail() {
	const { id } = useParams<{ id: string }>();
	const [songs, setSongs] = useState<Song[]>([]);
	const [author, setAuthor] = useState<Author | null>(null);

	useEffect(() => {
		const url = new URL(`/api/authors/${id}`, window.location.origin);

		fetch(url.toString())
			.then((response) => response.json())
			.then((data) => setAuthor(data))
			.catch((err) => console.error("Failed to fetch author:", err));
		const url2 = new URL(
			`/api/authors/${id}/songs`,
			window.location.origin
		);

		fetch(url2.toString())
			.then((response) => response.json())
			.then((data) => setSongs(data))
			.catch((err) => console.error("Failed to fetch author:", err));
	}, []);

	return (
		<AnimatedLayout>
			<Stack justify="flex-start" gap="xl">
				<Title order={1}>Author: {author?.name || ""}</Title>
				<ItemList
					cols={5}
					items={songs}
					CardComponent={SongCard}
					header={`Songs from author ${author?.name}`}
				/>
			</Stack>
		</AnimatedLayout>
	);
}

export default AuthorDetail;
