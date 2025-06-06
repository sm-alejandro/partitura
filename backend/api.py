"""API Backend
Copyright (C) 2025 Alejandro SM

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>."""

from typing import Optional

from fastapi import FastAPI, Form, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel

from backend.models import Author, Category, Playlist, PlaylistSong, Song
from config import PROJECT_DIR

app = FastAPI(title="Partitura API")

# Allow CORS (optional, useful for frontend clients)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Songs API"}


@app.get("/songs")
def get_songs(query: Optional[str] = Query(default="")):
    songs = Song.select().where(Song.title.contains(query))
    return [s.__data__ for s in songs]


@app.get("/songs/{song_id}")
def get_song(song_id: int):
    try:
        return Song.get_by_id(song_id).__data__
    except Exception as exc:
        raise HTTPException(status_code=404, detail="Song not found") from exc


@app.get("/authors")
def get_authors():
    return [a.__data__ for a in Author.select()]


@app.get("/authors/{author_id}")
def get_author(author_id: int):
    try:
        return Author.get_by_id(author_id).__data__
    except Exception as exc:
        raise HTTPException(status_code=404, detail="Author not found") from exc


@app.get("/authors/{author_id}/songs")
def get_author_songs(author_id: int):
    try:
        songs = Song.select(Song).where(Song.author == author_id)
        return [s.__data__ for s in songs]
    except Exception as exc:
        raise HTTPException(
            status_code=404, detail="Songs for author not found"
        ) from exc


@app.get("/categories")
def get_categories():
    return [c.__data__ for c in Category.select()]


@app.get("/categories/{category_id}")
def get_category(category_id: int):
    try:
        return Category.get_by_id(category_id).__data__
    except Exception as exc:
        raise HTTPException(status_code=404, detail="Category not found") from exc


@app.get("/categories/{category_id}/songs")
def get_category_songs(category_id: int):
    try:
        songs = Song.select(Song).where(Song.category == category_id)
        return [s.__data__ for s in songs]
    except Exception as exc:
        raise HTTPException(
            status_code=404, detail="Songs for category not found"
        ) from exc


@app.get("/playlists")
def get_playlists():
    return [p.__data__ for p in Playlist.select()]


@app.get("/playlists/{playlist_id}")
def get_playlist(playlist_id: int):
    try:
        return Playlist.get_by_id(playlist_id).__data__
    except Exception as exc:
        raise HTTPException(status_code=404, detail="Playlist not found") from exc


@app.get("/playlists/{playlist_id}/songs")
def get_playlist_songs(playlist_id: int):
    try:
        songs = (
            Song.select(Song)
            .join(PlaylistSong)
            .where(PlaylistSong.playlist == playlist_id)
        )
        return [s.__data__ for s in songs]
    except Exception as exc:
        raise HTTPException(
            status_code=404, detail="Songs for playlist not found"
        ) from exc


@app.post("/playlists")
def create_playlist(name: str = Form(...)):
    p = Playlist.create(name=name)
    return p.__data__


class SongId(BaseModel):
    song_id: int


@app.post("/playlists/{playlist_id}")
def add_song_to_playlist(playlist_id: int, songId: SongId):
    try:
        playlist = Playlist.get_by_id(playlist_id)
        song = Song.get_by_id(songId.song_id)
        PlaylistSong.create(playlist=playlist, song=song)
        return {"message": "Song added to playlist"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) from e


@app.delete("/playlists/{playlist_id}")
def delete_playlist(playlist_id):
    playlist = Playlist.get_by_id(playlist_id)
    if not playlist:
        return False

    # Assuming you have a method to delete the playlist
    Playlist.delete_by_id(playlist_id)
    return True


@app.get("/songs/{song_id}/files")
def get_song_files(song_id):
    song = Song.get_by_id(song_id)
    if not song:
        raise HTTPException(status_code=404, detail="Song not found")

    folder_path = song.folder  # Assuming this is the path to the folder
    category = Category.get_by_id(song.category)
    try:
        # List all files in the folder
        files = PROJECT_DIR / "backend" / "songs" / category.name / folder_path
        print(files)
        # Filter for PDF and MusicXML files
        song_files = {
            "pdf": list(files.glob("*.pdf")),
            "musicxml": list(files.glob("*.musicxml")),
        }
        return song_files
    except Exception as exc:
        raise HTTPException(
            status_code=500, detail="Error while fetching files"
        ) from exc


@app.get("/file")
async def get_file(file: Optional[str] = Query(default="")):
    file_path = PROJECT_DIR / file
    return FileResponse(file_path, media_type="application/pdf")
