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

import shutil
import sys
from pathlib import Path

from backend.models import Author, Category, Song
from config import PROJECT_DIR
from converter.mscz_exporter import mscz2pdf, mscz2xml
from converter.xml2pro import xml2pro2pdf


def add_song(filepath: Path):
    "Manage adding a sheet to the database and copying to the website public dir"
    folder = PROJECT_DIR / "backend" / "songs" / filepath.parent.name / filepath.stem
    folder.mkdir(exist_ok=True, parents=True)
    new_file = folder / filepath.name
    shutil.copy(filepath, new_file)

    title = filepath.stem
    author = "unknown"
    if filepath.suffix == ".mscz":
        musicxml_file = mscz2xml(new_file)
        mscz2pdf(new_file)
        converter = xml2pro2pdf(musicxml_file)
        title = converter.get_title()
        author = converter.get_composer()

    # Create entry in the db
    Song.get_or_create(
        title=title,
        author=Author.get_or_create(name=author, defaults={"image": "default"})[0],
        category=Category.get_or_create(name=filepath.parent.name)[0],
        folder=filepath.stem,
        image="google.com",
    )


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script.py <filename_or_directory>")
        sys.exit(1)

    input_path = Path(sys.argv[1])

    if input_path.is_dir():
        for file in input_path.rglob("*.mscz"):
            if file.is_file():
                add_song(file)
    elif input_path.is_file():
        add_song(input_path)
    else:
        print(f"{input_path} is not a valid file or directory.")
        sys.exit(1)
