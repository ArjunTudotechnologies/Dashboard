import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import ReactSignatureCanvas from "react-signature-canvas";
import TitleBar from "../Dashboard/TitleBar/TitleBar";
import { UilAngleLeftB } from "@iconscout/react-unicons";

import "./Pdfview.css";
import { useHistory } from "react-router-dom";
function Pdfview() {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [sign, setSign] = useState(false);
	const [canvasWidth, setCanvasWidth] = useState(null);
	const [canvasHeight, setCanvasHeight] = useState(null);
	const [refer, setRefer] = useState([]);
	let refs = [];
	const history = useHistory();
	const handlePdfviewerHeight = () => {
		const whole = document.querySelector(".Pdfview");
		const head = document.querySelector(".header");
		const viewer = document.querySelector(".wrapperCanvas");
		viewer.style.height = whole.offsetHeight - head.offsetHeight + "px";
	};
	React.useEffect(() => {
		handlePdfviewerHeight();
	}, []);
	const handleHistoryBack = () => {
		history.goBack();
	};
	function onDocumentLoadSuccess({ numPages }) {
		// alert("asfd");
		setNumPages(numPages);
		setPageNumber(1);
		setTimeout(() => {
			const canvas = document.querySelector(".react-pdf__Page__canvas");
			const signature = document.querySelector(".sigCanvas");
			// console.log(signature);
			setCanvasWidth(canvas.width);
			setCanvasHeight(canvas.height);
		}, 1000);
	}

	function changePage(offSet) {
		setPageNumber((prevPageNumber) => prevPageNumber + offSet);
	}

	function changePageBack() {
		changePage(-1);
	}

	function changePageNext() {
		changePage(+1);
	}
	let bbox_rect;
	let painting = false;

	const handleSign = () => {
		const status = !sign;
		console.log(refer, status);
		const signature = document.querySelectorAll(".sigCanvas");
		refs.forEach((item, ind) => {
			if (!status) item.off();
			else item.on();
		});
		setSign(status);
		// if (!status) {
		// 	signature.forEach((item, ind) => {
		// 		const context = item.getContext("2d");

		// 		context.clearRect(0, 0, item.width, item.height);
		// 	});
		// }
	};

	return (
		<div className='Pdfview vh-100'>
			<div className='header'>
				<div className='d-flex'>
					<span
						className=''
						onClick={handleHistoryBack}
						style={{ cursor: "pointer" }}>
						<UilAngleLeftB size='30' />
					</span>
					<TitleBar title={"PDF View"} />
				</div>
				<div className='userProfile'>
					<span className='btn btn-info me-3' onClick={handleSign}>
						{sign ? "Normal" : "Sign"}
					</span>
					{/* <img
						src='/assets/images/user.JPG'
						alt=''
						className='userImage img-fluid me-3'
					/>
					<FontAwesomeIcon icon={faAngleDown} /> */}
				</div>
			</div>
			{/* <header className='Pdfview-header'>
				<Document
					file='/assets/Resume.pdf'
					onLoadSuccess={onDocumentLoadSuccess}>
					<Page height='600' pageNumber={pageNumber} />
				</Document>
				<p>
					{" "}
					Page {pageNumber} of {numPages}
				</p>
				{pageNumber > 1 && (
					<button onClick={changePageBack}>Previous Page</button>
				)}
				{pageNumber < numPages && (
					<button onClick={changePageNext}>Next Page</button>
				)}
			</header> */}

			<div
				className=' wrapperCanvas py-3 d-flex justify-content-center'
				style={{ overflowY: "scroll", background: "#dbd8d0" }}>
				<Document
					file='/assets/Resume.pdf'
					onLoadSuccess={onDocumentLoadSuccess}>
					{Array.from(new Array(numPages), (el, index) => (
						<div className=''>
							<Page
								size='A4'
								className='position-relative pdfmbl'
								key={`page_${index + 1}`}
								pageNumber={index + 1}>
								<ReactSignatureCanvas
									ref={(ref) => {
										if (ref != null) {
											refs.push(ref);
										}
									}}
									penColor='black'
									canvasProps={{
										width:
											canvasWidth != null
												? canvasWidth
												: 100,
										height:
											canvasHeight != null
												? canvasHeight
												: 100,
										className: `sigCanvas position-absolute `,
									}}
								/>
							</Page>
						</div>
					))}
				</Document>
			</div>
		</div>
	);
}

export default Pdfview;
