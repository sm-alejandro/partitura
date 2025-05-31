import { Link } from "react-router-dom";
import type { Playlist } from "../models/Playlist";

function generateColor(name: string): string {
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

export default function PlaylistCard({ item }: { item: Playlist }) {
	return (
		<Link
			to={`/playlists/${item.id}`}
			className="flex items-center space-x-2 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
			style={{ backgroundColor: generateColor(item.name) }}
		>
			<span className="text-lg text-white font-semibold">
				{item.name}
			</span>
		</Link>
	);
}
