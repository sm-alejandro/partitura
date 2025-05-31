import type { Identifiable } from "../models/Identifiable";

function ItemList<T extends Identifiable>({
	items,
	header,
	CardComponent,
}: {
	items: T[];
	header: string;
	CardComponent: React.ComponentType<{ item: T }>;
}) {
	return (
		<div className="text-white">
			<main className="container mx-auto p-6">
				<h2 className="text-4xl mb-6">{header}</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{items.map((item) => (
						<CardComponent key={item.id} item={item} />
					))}
				</div>
			</main>
		</div>
	);
}

export default ItemList;
