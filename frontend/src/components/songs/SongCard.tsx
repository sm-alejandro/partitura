import { Link } from "react-router-dom";
import type { Song } from "../../models/Song";
import { Card, Image, Title } from "@mantine/core";

const placeholderImage = "/cd_placeholder.png";

function SongCard({ item }: { item: Song }) {
	return (
		<Card
			shadow="sm"
			padding="lg"
			radius="md"
			withBorder
			component={Link}
			to={`/songs/${item.id}`}
		>
			<Card.Section>
				<Image
					src={item.image}
					h={200}
					fit="cover"
					fallbackSrc={placeholderImage}
					alt={item.image}
				/>
			</Card.Section>
			<Card.Section p={10}>
				<Title order={3}>{item.title}</Title>
			</Card.Section>
		</Card>
	);
}

export default SongCard;
