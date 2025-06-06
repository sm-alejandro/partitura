import subprocess
from pathlib import Path

from config import MUSESCORE_EXE


def mscz2xml(filepath: Path):
    "Converts musescore sheet to xml"
    musicxml_file = filepath.with_suffix(".musicxml")
    subprocess.run([MUSESCORE_EXE, filepath, "-o", musicxml_file], check=True)
    return musicxml_file


def mscz2pdf(filepath: Path):
    "Converts musescore sheet to pdf"
    pdf_file = filepath.with_suffix(".pdf")
    subprocess.run(
        [MUSESCORE_EXE, filepath, "-o", pdf_file],
        check=True,
    )
