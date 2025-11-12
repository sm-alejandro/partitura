import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/shared/Header";
import Playlists from "./components/playlists/Playlists";
import AuthorDetail from "./components/authors/AuthorDetail";
import MusicXMLViewerPage from "./components/shared/MusicXML";
import "@mantine/core/styles.css";
import { AppShell, Container, MantineProvider } from "@mantine/core";
import SongCard from "./components/songs/SongCard";
import Collection from "./components/shared/Collection";
import CategoryCard from "./components/categories/CategoryCard";
import AuthorCard from "./components/authors/AuthorCard";
import CategoryDetail from "./components/categories/CategoryDetail";
import PlaylistDetail from "./components/playlists/PlaylistDetail";
import SongDetail from "./components/songs/SongDetail";

function App() {
	return (
		<MantineProvider defaultColorScheme="dark">
			<AppShell padding="md" header={{ height: 84, offset: true }}>
				<AppShell.Header>
					<Header />
				</AppShell.Header>

				<AppShell.Main>
					<Container size="xl">
						<Routes>
							<Route
								path="/"
								element={<Navigate to="/songs" replace />}
							/>
							<Route
								path="/songs"
								element={
									<Collection
										collection="songs"
										CardComponent={SongCard}
									/>
								}
							/>
							<Route path="/songs/:id" element={<SongDetail />} />
							<Route
								path="/categories"
								element={
									<Collection
										collection="categories"
										CardComponent={CategoryCard}
									/>
								}
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
							<Route
								path="/authors"
								element={
									<Collection
										collection="authors"
										CardComponent={AuthorCard}
									/>
								}
							/>
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
