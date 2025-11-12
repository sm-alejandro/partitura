import { SimpleGrid } from "@mantine/core";
import type { Identifiable } from "../../models/Identifiable";

function ItemList<T extends Identifiable>({
	items,
	CardComponent,
}: {
	items: T[];
	header: string;
	CardComponent: React.ComponentType<{ item: T }>;
}) {
	return (
		<SimpleGrid
			cols={{ base: 1, sm: 2, lg: 5 }}
			spacing={{ base: 10, sm: "xl" }}
			verticalSpacing={{ base: "md", sm: "xl" }}
		>
			{items.map((item) => (
				<CardComponent key={item.id} item={item} />
			))}
		</SimpleGrid>
	);
}

export default ItemList;
