import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import TitleBar from "../Dashboard/TitleBar/TitleBar";
import "./Pdfview.css";
function Pdfview() {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [sign, setSign] = useState(false);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
		setPageNumber(1);
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
	const removeDraw = () => {
		console.log("undraw");
		var canvasAll = document.querySelectorAll(".react-pdf__Page__canvas");
		console.log(canvasAll);
		canvasAll.forEach((item, ind) => {
			let ctx = item.getContext("2d");
			// item.replaceWith(item.cloneNode(true));
			item.removeEventListener("mousedown", startposition, true);
			item.removeEventListener("touchstart", startposition, true);
			item.removeEventListener("mouseup", item.finish, true);
			item.removeEventListener("touchend", item.mfinish, true);
			item.removeEventListener("mousemove", item.paint, true);
			item.removeEventListener("touchmove", item.mpaint, true);
		});
	};

	const paint = (e, ctx) => {
		if (!painting) return;
		ctx.lineWidth = 1;
		ctx.lineCap = "round";
		// const wrapper = document.querySelector(".wrapperCanvas");
		let X = e.pageX - bbox_rect.left;
		// let Y = e.pageY + wrapper.scrollTop;
		let Y = e.layerY;
		// console.log(e);
		console.log(e, X, bbox_rect.left);

		ctx.lineTo(X, Y);
		ctx.stroke();
		if (
			e.clientX - 10 < bbox_rect.left ||
			e.clientX + 10 > bbox_rect.right
		) {
			painting = false;
			ctx.beginPath();
		}
	};
	const mpaint = (e, ctx) => {
		e.preventDefault();
		// alert("wah");
		var canvas = document.querySelector(".react-pdf__Page__canvas");
		var xratio = window.innerWidth / canvas.width;
		var yratio = window.innerHeight / canvas.height;

		var touch = e.touches[0];
		if (!painting) return;
		ctx.lineWidth = 1;
		ctx.lineCap = "round";
		// ctx.beginPath();
		// ctx.rect(259, 800, 150, 100);
		// ctx.stroke();
		// const wrapper = document.querySelector(".wrapperCanvas");
		let X = touch.clientX - canvas.offsetLeft;
		// let Y = e.pageY + wrapper.scrollTop;
		let Y = touch.clientY;
		console.log(e, X, Y, bbox_rect.left, bbox_rect.top);
		// alert(Y);
		// console.log("m", X, Y);
		ctx.lineTo(X / xratio, Y / yratio);
		ctx.stroke();

		// if (
		// 	e.clientX - 10 < bbox_rect.left ||
		// 	e.clientX + 10 > bbox_rect.right
		// ) {
		// 	painting = false;
		// 	ctx.beginPath();
		// }
		// return false;
	};
	const startposition = (e) => {
		painting = true;
		// alert(e);
		paint(e);
	};
	const finishedposition = (ctx) => {
		painting = false;
		ctx.beginPath();
	};
	const draw = () => {
		console.log("draw");
		var canvasAll = document.querySelectorAll(".react-pdf__Page__canvas");
		console.log(canvasAll);
		canvasAll.forEach((item, ind) => {
			let ctx = item.getContext("2d");

			bbox_rect = item.getBoundingClientRect();

			item.addEventListener("mousedown", startposition, true);
			item.addEventListener("touchstart", startposition, true);
			item.addEventListener(
				"mouseup",
				(item.finish = () => finishedposition(ctx)),
				true
			);
			item.addEventListener(
				"touchend",
				(item.mfinish = () => finishedposition(ctx)),
				true
			);
			item.addEventListener(
				"mousemove",
				(item.paint = (e) => paint(e, ctx)),
				true
			);
			item.addEventListener(
				"touchmove",
				(item.mpaint = (e) => mpaint(e, ctx)),
				true
			);
			// item.addEventListener("click", (e) => console.log("clicke", e));
		});
	};
	// window.onload = function () {
	// 	setTimeout(() => {
	// 		draw();
	// 	}, 5000);
	// };
	const handleSign = () => {
		const status = !sign;
		setSign(status);
		if (status) {
			console.log(status);
			draw();
		} else removeDraw();
	};
	return (
		<div className='Pdfview vh-100'>
			<div className='header'>
				<TitleBar title={"Pdf view"} />
				<div className='userProfile'>
					<span className='btn btn-info me-3' onClick={handleSign}>
						{sign ? "Normal" : "Sign"}
					</span>
					<img
						src='/assets/images/user.JPG'
						alt=''
						className='userImage img-fluid me-3'
					/>
					<FontAwesomeIcon icon={faAngleDown} />
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
			<center>
				<div
					className=' wrapperCanvas py-3'
					style={{ overflowY: "scroll", background: "#dbd8d0" }}>
					<Document
						file='/assets/Resume.pdf'
						onLoadSuccess={onDocumentLoadSuccess}>
						{Array.from(new Array(numPages), (el, index) => (
							<Page
								width='300'
								key={`page_${index + 1}`}
								pageNumber={index + 1}
							/>
						))}
					</Document>
				</div>
			</center>
		</div>
	);
}

export default Pdfview;
