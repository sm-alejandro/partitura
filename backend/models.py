"""Database models and startup functions
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

from peewee import CharField, ForeignKeyField, Model, SqliteDatabase

from config import PROJECT_DIR

# Define the SQLite database
db = SqliteDatabase(PROJECT_DIR / "backend" / "songs.db")


class BaseModel(Model):
    class Meta:
        database = db


class Author(BaseModel):
    name = CharField(unique=True)
    image = CharField()


class Category(BaseModel):
    name = CharField(unique=True)


class Song(BaseModel):
    title = CharField()
    author = ForeignKeyField(Author, backref="songs")
    category = ForeignKeyField(Category, backref="songs")
    folder = CharField()
    image = CharField()


class Playlist(BaseModel):
    name = CharField()


class PlaylistSong(BaseModel):
    playlist = ForeignKeyField(Playlist, backref="songs")
    song = ForeignKeyField(Song, backref="playlist")

    class Meta:
        indexes = ((("playlist", "song"), True),)  # Unique constraint


# Create tables
def initialize_db():
    db.connect()
    db.create_tables([Author, Category, Song, Playlist, PlaylistSong], safe=True)
    db.close()


def delete_db():
    # Connect to the database
    db.connect()
    db.drop_tables([Author, Category, Song, Playlist, PlaylistSong])
    db.close()


def fill_db():
    Author.create(
        name="Franz Schubert",
        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftheclassicreview.com%2Fwp-content%2Fuploads%2F2018%2F12%2FSchubert-1200-850.jpg&f=1&nofb=1&ipt=6ec9473de1413ad07dd71da5b117e8ebf35dba2d9103fda478655a6931bd6bb0",
    )


if __name__ == "__main__":
    delete_db()
    initialize_db()
    fill_db()
