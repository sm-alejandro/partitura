import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		navigate(`/songs?query=${encodeURIComponent(query.trim())}`);
	};

	return (
		<header className="bg-gray-900 text-white p-4 shadow-lg">
			<div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
				<h1 className="text-3xl font-bold mb-2 md:mb-0">
					<Link
						to="/"
						className="hover:text-blue-400 transition duration-200"
					>
						My Songs
					</Link>
				</h1>
				<nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
					<Link
						to="/authors"
						className="hover:text-blue-400 transition duration-200"
					>
						Authors
					</Link>
					<Link
						to="/categories"
						className="hover:text-blue-400 transition duration-200"
					>
						Categories
					</Link>
					<Link
						to="/playlists"
						className="hover:text-blue-400 transition duration-200"
					>
						Playlists
					</Link>
				</nav>
				<div className="mt-2 md:mt-0">
					<form onSubmit={handleSubmit} className="flex">
						<input
							type="text"
							name="query"
							placeholder="Search..."
							className="p-2 rounded-l bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<button
							type="submit"
							className="p-2 bg-blue-600 rounded-r hover:bg-blue-500 transition duration-200"
						>
							Search
						</button>
					</form>
				</div>
			</div>
		</header>
	);
}

export default Header;
