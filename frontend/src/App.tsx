import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/shared/Header";
import Playlists from "./components/playlists/Playlists";
import AuthorDetail from "./components/authors/AuthorDetail";
import MusicXMLViewerPage from "./components/shared/MusicXML";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { AppShell, Container, MantineProvider } from "@mantine/core";
import CategoryDetail from "./components/categories/CategoryDetail";
import PlaylistDetail from "./components/playlists/PlaylistDetail";
import SongDetail from "./components/songs/SongDetail";
import { Notifications } from "@mantine/notifications";
import Categories from "./components/categories/Categories";
import Authors from "./components/authors/Authors";
import Songs from "./components/songs/Songs";

const routes = [
	{ path: "", element: <Navigate to="/songs" /> },
	{ path: "/songs", element: <Songs /> },
	{ path: "/songs/:id", element: <SongDetail /> },
];

function App() {
	return (
		<MantineProvider defaultColorScheme="dark">
			<Notifications />
			<AppShell padding="md" header={{ height: 84, offset: true }}>
				<AppShell.Header>
					<Header />
				</AppShell.Header>

				<AppShell.Main>
					<Container size="xl">
						<Routes>
							{routes.map((r) => (
								<Route
									key={r.path}
									path={r.path}
									element={r.element}
								/>
							))}
							<Route
								path="/categories"
								element={<Categories />}
							/>
							<Route
								path="/categories/:id"
								element={<CategoryDetail />}
							/>
							<Route path="/playlists" element={<Playlists />} />
							<Route
								path="/playlists/:id"
								element={<PlaylistDetail />}
							/>
							<Route path="/authors" element={<Authors />} />
							<Route
								path="/authors/:id"
								element={<AuthorDetail />}
							/>
							<Route
								path="/musicxml"
								element={<MusicXMLViewerPage />}
							/>
						</Routes>
					</Container>
				</AppShell.Main>
			</AppShell>
		</MantineProvider>
	);
}

export default App;
