import { Link } from "react-router-dom";
import type { Author } from "../../models/Author";
import { Avatar, Title, Card, Group } from "@mantine/core";

export default function AuthorCard({ item }: { item: Author }) {
	return (
		<Card component={Link} to={`/authors/${item.id}`}>
			<Group>
				<Avatar
					src={item.image}
					alt="Author Avatar"
					radius="xl"
					size="xl"
				/>
				<Title order={2}>{item.name}</Title>
			</Group>
		</Card>
	);
}
