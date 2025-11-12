import { Link } from "react-router-dom";
import type { Category } from "../../models/Category";
import { Card, Group, Title } from "@mantine/core";

function generateColor(name: string): string {
	if (!name) return "#000";
	let hash = 0;
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash);
	}
	// Convert hash to hex color
	const r = (hash >> 24) & 0xff;
	const g = (hash >> 16) & 0xff;
	const b = (hash >> 8) & 0xff;

	// Darken the color by multiplying by a factor (e.g., 0.5)
	const darkenFactor = 0.7;
	const darkR = Math.floor(r * darkenFactor);
	const darkG = Math.floor(g * darkenFactor);
	const darkB = Math.floor(b * darkenFactor);

	const color =
		"#" +
		darkR.toString(16).padStart(2, "0") +
		darkG.toString(16).padStart(2, "0") +
		darkB.toString(16).padStart(2, "0");

	return color;
}

export default function CategoryCard({ item }: { item: Category }) {
	return (
		<Card
			component={Link}
			to={`/categories/${item.id}`}
			style={{ backgroundColor: generateColor(item.name) }}
		>
			<Group>
				<Title order={3}>{item.name}</Title>
			</Group>
		</Card>
	);
}
