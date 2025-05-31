"Database models and startup functions"

from peewee import CharField, ForeignKeyField, Model, SqliteDatabase

from config import PROJECT_DIR

# Define the SQLite database
db = SqliteDatabase(PROJECT_DIR / "database" / "songs.db")


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
