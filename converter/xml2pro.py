"""Convert MusicXML to Chordpro"""

import subprocess
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

from converter import maps


class XML2Pro:
    "Class to convert xml to chordpro"

    song = []
    in_repeat = -1
    result = parts = tree = root = title = None

    def process_file(self, file):
        "Import and process a musicxml file"
        self.tree = ET.parse(file)
        self.root = self.tree.getroot()
        self.process_root()
        with open(Path(file).with_suffix(".pro"), "w", encoding="utf-8") as f:
            f.write(self.result)

    def process_root(self):
        "Start processing from the root"
        self.process_metadata()

        # Get a list of all of the parts
        partlists = self.root.findall("part-list/score-part")
        target_id = 0
        for part in partlists:
            part_id = part.attrib["id"]
            part_name = part.find("part-name")
            if part_name.text == "Voice":
                target_id = part_id

        # Then ignore the parts in the part list, and just go through the children.
        self.parts = self.root.findall("part")
        for part in self.parts:
            if part.attrib["id"] == target_id:
                self.process_part(part)

    def get_title(self):
        return self.root.find("work/work-title").text

    def get_composer(self):
        c = self.root.find("identification/creator[@type='composer']")
        return c.text if c else "unknown"

    def process_metadata(self):
        "Get the song name and descriptions"
        self.result = f"{{title:{self.get_title()}}}\n"
        identification = self.root.findall("identification/creator")
        for field in identification:
            self.result += f"{{subtitle:{field.text}}}\n"
            self.result += f"{{{field.attrib['type']}:{field.text}}}\n"

    def process_part(self, part):
        "Process the voice part"
        key_index = int(part.find("measure/attributes/key/fifths").text)
        key = maps.keys[key_index]
        self.result += f"{{key:{key[0]} {key[1]}}}\n\n"

        measures = list(
            part.findall("measure")
        )  # Assume measures are sorted. We should really sort them by attribute 'number'

        verse = 1
        for index, m in enumerate(measures):
            self.process_measure(m, verse)
            repeat = m.find("barline/repeat")
            if (repeat := m.find("barline/repeat")) is not None:
                direction = repeat.get("direction")
                if direction == "forward":
                    self.in_repeat = index
                if direction == "backward":
                    any_found = False
                    for verse_index in range(verse + 1, 10):
                        found = False
                        for i in range(self.in_repeat, index + 1):
                            m_search = measures[i]
                            if (
                                len(
                                    m_search.findall(
                                        f'note/lyric[@number="{verse_index}"]'
                                    )
                                )
                                != 0
                            ):
                                found = True
                                break
                        if found:
                            any_found = True
                            for i in range(self.in_repeat, index + 1):
                                self.process_measure(measures[i], verse_index)
                        else:
                            if not any_found:
                                self.result += "(bis)\n"
                            break

    def process_measure(self, measure, verse):
        "Process a single measure"
        text = ""
        stype = ""
        measure_config = {
            "eoc": False,
            "soc": False,
            "part_indicator": False,
            "chorus": False,
            "ending": 0,
        }
        for child in measure:
            if child.tag == "direction":
                part = child.find("direction-type/words")
                if part is not None and part.text.startswith(":"):
                    if part.text == ":soc":
                        measure_config["soc"] = True
                    elif part.text == ":eoc":
                        measure_config["eoc"] = True
                    elif part.text == ":chorus":
                        measure_config["chorus"] = True
                    else:
                        measure_config["part_indicator"] = part.text[1:]

            if child.tag == "harmony":
                chord_root = child.find("root/root-step").text
                try:
                    chord_alter = child.find("root/root-alter").text
                    alter = maps.accidentals[int(chord_alter)]
                except Exception:
                    alter = ""
                q_code = maps.kinds[child.find("kind").text]
                if q_code == "none":
                    chord_root = "."
                    q_code = ""
                text += "[" + chord_root + alter + q_code + "]"
            elif child.tag == "note":
                lyrics = child.findall(f'lyric[@number="{verse}"]')
                for lyr in lyrics:
                    stype = lyr.find("syllabic").text
                    syllable = lyr.find("text").text
                    # If this is a single syllable word, or the end of a word, print a space
                    text += syllable
                    if stype in ["single", "end"]:
                        text += " "
            elif child.tag == "barline":
                ending = child.find("ending")
                if ending is not None:
                    measure_config["ending"] = int(ending.attrib["number"])
        self.result += self.create_measure_from_config(text, measure_config)

    def create_measure_from_config(self, text, config):
        "Create measure text from loaded/imported config"

        output = text
        if config["eoc"]:
            output += "\n{end_of_chorus}\n"
        if config["soc"]:
            output = "\n{start_of_chorus}\n" + output
        if config["chorus"]:
            output += "\n\n{comment:chorus}\n\n\n"
        if config["ending"] > 0:
            output = f" {config['ending']}.{output}"
        if p := config["part_indicator"]:
            output = f"\n\n{{comment:{p}}}\n{output}"

        output = output.replace("|", "\n")
        return output


def xml2pro2pdf(input_file: Path):
    "Execute the command with the input file"
    converter = XML2Pro()
    converter.process_file(input_file)
    subprocess.run(
        [
            "chordpro",
            input_file.with_suffix(".pro"),
            "-o",
            input_file.parent / (input_file.stem + "_letra.pdf"),
        ],
        check=False,
    )
    return converter


def main():
    "Process file or directory provided as argument"
    if len(sys.argv) < 2:
        print("Usage: python script.py <filename_or_directory>")
        sys.exit(1)

    input_path = Path(sys.argv[1])

    if input_path.is_dir():
        for musicxml_file in input_path.rglob("*.musicxml"):
            xml2pro2pdf(musicxml_file)
    elif input_path.is_file():
        xml2pro2pdf(input_path)
    else:
        print(f"{input_path} is not a valid file or directory.")
        sys.exit(1)


if __name__ == "__main__":
    main()
