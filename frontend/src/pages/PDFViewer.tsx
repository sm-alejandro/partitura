import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { useLocation } from "react-router-dom";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

const PDFViewer: React.FC = () => {
	const location = useLocation();
	const [numPages, setNumPages] = useState<number | null>(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [fileUrl, setFileUrl] = useState<string | null>(null);

	// Extract the fileName from query parameters
	const queryParams = new URLSearchParams(location.search);
	const fileName = queryParams.get("file");

	useEffect(() => {
		if (fileName) {
			setFileUrl(`/api/file?file=${fileName}`);
		}
	}, [fileName]);

	const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
		setNumPages(numPages);
	};

	return (
		<div>
			<div>
				<button
					onClick={() =>
						setPageNumber((prev) => Math.max(prev - 1, 1))
					}
					disabled={pageNumber <= 1}
				>
					◀️ Previous
				</button>
				<button
					onClick={() =>
						setPageNumber((prev) =>
							Math.min(prev + 1, numPages || 1)
						)
					}
					disabled={pageNumber >= (numPages || 1)}
				>
					Next ▶️
				</button>
			</div>
			<div
				className="w-[90vw] h-auto mx-[20px] my-0 border-1 border-solid mx-auto bg-white"
				style={{ overflow: "auto", maxHeight: "80vh" }}
			>
				{fileUrl && (
					<Document
						file={fileUrl}
						onLoadSuccess={onDocumentLoadSuccess}
					>
						<Page pageNumber={pageNumber} />
					</Document>
				)}
			</div>
			<p>
				Page {pageNumber} of {numPages || 1}
			</p>
		</div>
	);
};

export default PDFViewer;
