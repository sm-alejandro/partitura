import { Link } from "react-router-dom";
import type { Song } from "../models/Song";
import { useState } from "react";

const placeholderImage = "/cd_placeholder.png";

function SongCard({ item }: { item: Song }) {
	const [imgSrc, setImgSrc] = useState(item.image || placeholderImage);
	return (
		<Link
			to={`/songs/${item.id}`}
			className="group bg-black relative block overflow-hidden rounded-lg shadow-lg bg-gray-800 transition-transform transform hover:scale-105"
		>
			<div className="bg-black opacity-20 group-hover:opacity-0 absolute inset-0 flex items-end justify-center transition-opacity duration-300"></div>
			<img
				src={imgSrc}
				onError={() => setImgSrc(placeholderImage)}
				className="w-full h-48 object-cover transition-transform duration-300"
			/>
			<h2 className="text-xl font-semibold text-white p-4 transition-opacity duration-300">
				{item.title}
			</h2>
		</Link>
	);
}

export default SongCard;
