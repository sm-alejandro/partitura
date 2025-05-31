import { Routes, Route, Navigate } from "react-router-dom";
import Songs from "./pages/Songs";
import Header from "./components/Header";
import SongDetail from "./pages/SongDetail";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import Playlists from "./pages/Playlists";
import PlaylistDetail from "./pages/PlaylistDetail";
import Authors from "./pages/Authors";
import AuthorDetail from "./pages/AuthorDetail";
import MusicXMLViewerPage from "./pages/MusicXML";
import PDFViewer from "./pages/PDFViewer";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Navigate to="/songs" replace />} />
				<Route path="/songs" element={<Songs />} />
				<Route path="/songs/:id" element={<SongDetail />} />
				<Route path="/categories" element={<Categories />} />
				<Route path="/categories/:id" element={<CategoryDetail />} />
				<Route path="/playlists" element={<Playlists />} />
				<Route path="/playlists/:id" element={<PlaylistDetail />} />
				<Route path="/authors" element={<Authors />} />
				<Route path="/authors/:id" element={<AuthorDetail />} />
				<Route path="/musicxml" element={<MusicXMLViewerPage />} />
				<Route path="/pdfviewer" element={<PDFViewer />} />
			</Routes>
		</>
	);
}

export default App;
