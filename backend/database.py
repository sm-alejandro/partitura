"""Database functions
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

import yamale
from config import PROJECT_DIR
from models import Author, Category, Song


def add_songs():
    # find all info.yaml files
    folder = PROJECT_DIR / "songs"
    files = folder.rglob("**/info.yaml")
    schema = yamale.make_schema("./schema.yaml")

    # read song data
    for file in files:
        data = yamale.make_data(file)
        yamale.validate(schema, data)
        data = data[0][0]
        Song.get_or_create(
            slug=data["id"],
            title=data["title"],
            author=Author.get_or_create(
                name=data["author"], defaults={"image": "default"}
            )[0],
            category=Category.get_or_create(name=data["category"])[0],
            folder=file.parent.stem,
            image=data["image"],
        )


if __name__ == "__main__":
    add_songs()
    add_songs()
    add_songs()
