import React, { useEffect, useRef } from "react";
import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import { useLocation } from "react-router-dom";

const MusicXMLViewer: React.FC = () => {
	const location = useLocation();
	const osmdRef = useRef<OpenSheetMusicDisplay | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const queryParams = new URLSearchParams(location.search);
	const fileName = queryParams.get("file");

	useEffect(() => {
		const fetchMusicXML = async () => {
			if (containerRef.current && fileName) {
				osmdRef.current = new OpenSheetMusicDisplay(
					containerRef.current,
					{
						autoResize: true,
					}
				);

				try {
					const response = await fetch(`/api/file?file=${fileName}`);
					if (!response.ok) {
						throw new Error("Network response was not ok");
					}
					const musicXML = await response.text();
					await osmdRef.current.load(musicXML);
					osmdRef.current.render();
					osmdRef.current.cursor.show();
				} catch (error) {
					console.error("Error fetching MusicXML:", error);
				}
			}
		};

		fetchMusicXML();

		return () => {
			osmdRef.current?.clear();
		};
	}, [fileName]);

	const playMusic = () => {
		if (osmdRef.current?.cursor) {
			osmdRef.current.cursor.reset();
			osmdRef.current.cursor.show();
			// osmdRef.current.cursor.play();
		}
	};

	const stopMusic = () => {
		if (osmdRef.current?.cursor) {
			osmdRef.current.cursor.hide();
		}
	};

	return (
		<div className="p-4">
			<div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
				<button
					onClick={playMusic}
					className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
				>
					▶️ Play
				</button>
				<button
					onClick={stopMusic}
					className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
				>
					⏹️ Stop
				</button>
			</div>
			<div
				className="w-full max-w-[90vw] h-auto mx-auto border border-solid bg-white"
				ref={containerRef}
			/>
		</div>
	);
};

export default MusicXMLViewer;
