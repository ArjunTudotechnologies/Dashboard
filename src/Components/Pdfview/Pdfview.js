import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import ReactSignatureCanvas from "react-signature-canvas";
import TitleBar from "../Dashboard/TitleBar/TitleBar";
import { UilAngleLeftB } from "@iconscout/react-unicons";
import { useHistory } from "react-router-dom";
import "./Pdfview.css";
import { Modal, Button } from "react-bootstrap";
import $ from "jquery";
import DatePicker from "react-datepicker";
import ReactDOM from "react-dom";
function Pdfview() {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [sign, setSign] = useState(false);
	const [canvasWidth, setCanvasWidth] = useState(null);
	const [canvasHeight, setCanvasHeight] = useState(null);
	const [baseUrl, setBaseUrl] = useState("");
	const [upload, setupload] = useState(false);
	const [CanvbaseUrl, setCanvBaseUrl] = useState("");
	const [showPad, setShowPad] = useState(false);

	const handleClose = () => setShowPad(false);
	const handleShow = () => setShowPad(true);
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
		const localData = localStorage.getItem("dynamicInputs");
		if (localData?.length) {
			PopulateStoredData(JSON.parse(localData));
		}
	}, []);
	function setAttributes(el, attrs) {
		Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
	}
	const PopulateStoredData = (items) => {
		items.forEach((item) => {
			const parent = document.createElement(`div`);
			const child = document.createElement(`${item.type}`);
			const Container = document.querySelector(".wrapperCanvas");
			if (item.type == "INPUT") {
				child.type = "date";
				child.style.height = "max-content";
				child.classList.add("dynamicDragItem");
				child.value = item.value;
				child.style.border = "1px dotted black";
				child.style.width = "max-content";
			} else {
				child.src = item.src;
				child.draggable = false;
				child.classList.add("img-fluid");
				child.classList.add("dynamicDragItem");
				child.style.pointerEvents = "none";
			}
			setAttributes(parent, item.attrs);
			parent.append(child);
			Container.append(parent);

			parent.addEventListener("dblclick", () => handleResize(parent));

			Container.addEventListener("touchstart", dragStart, false);
			Container.addEventListener("touchend", dragEnd, false);
			Container.addEventListener("touchmove", drag, false);

			Container.addEventListener("mousedown", dragStart, false);
			Container.addEventListener("mouseup", dragEnd, false);
			Container.addEventListener("mousemove", drag, false);
		});

		// const wrapper = d;
	};
	const handleHistoryBack = () => {
		history.goBack();
	};
	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
		setPageNumber(1);
		setTimeout(() => {
			const canvas = document.querySelector(".react-pdf__Page__canvas");
			const signature = document.querySelector(".sigCanvas");
			setCanvasWidth(canvas.width);
			setCanvasHeight(canvas.height);
		}, 1000);
	}

	function changePage(offSet) {
		setPageNumber((prevPageNumber) => prevPageNumber + offSet);
	}

	const handleSign = () => {
		const status = !sign;
		console.log(refer, status);
		const signature = document.querySelectorAll(".sigCanvas");
		refs.forEach((item, ind) => {
			if (!status) item.off();
			else item.on();
		});
		setSign(status);
	};
	function encodeImageFileAsURL(element) {
		var file = element.target.files[0];
		var reader = new FileReader();
		reader.onloadend = function () {
			console.log("RESULT", reader.result);
			localStorage.setItem("baseUrl", reader.result);
			setBaseUrl(reader.result);
		};
		reader.readAsDataURL(file);
	}
	var active = false;

	var resize = false;
	var dragItem;
	var wrapperID = 0;
	const handleResize = (wrapper) => {
		wrapper.classList.toggle("resize");
		const Container = document.querySelector(".wrapperCanvas");
		resize = !resize;

		if (resize) {
			Container.removeEventListener("touchstart", dragStart, false);
			Container.removeEventListener("touchend", dragEnd, false);
			Container.removeEventListener("touchmove", drag, false);

			Container.removeEventListener("mousedown", dragStart, false);
			Container.removeEventListener("mouseup", dragEnd, false);
			Container.removeEventListener("mousemove", drag, false);
		} else {
			Container.addEventListener("touchstart", dragStart, false);
			Container.addEventListener("touchend", dragEnd, false);
			Container.addEventListener("touchmove", drag, false);

			Container.addEventListener("mousedown", dragStart, false);
			Container.addEventListener("mouseup", dragEnd, false);
			Container.addEventListener("mousemove", drag, false);
		}
	};
	const handleSignatureDrop = (e) => {
		e.preventDefault();
		console.log(e);
		let child = null;
		if (e.dataTransfer.getData("type") == "date") {
			const div = document.createElement("div");
			const date = document.createElement("input");
			date.type = "date";
			date.style.height = "max-content";
			date.classList.add("dynamicDragItem");

			div.style.border = "1px dotted black";
			div.style.width = "max-content";
			// div.style.padding = "5px";
			// date.style.pointerEvents = "none";
			div.append(date);
			child = div;
			// e.target.append(date);
		} else {
			const image = document.createElement("img");
			//populating a image with the uploaded image
			image.src = e.dataTransfer.getData("base64String");
			image.draggable = false;
			image.classList.add("img-fluid");
			image.classList.add("dynamicDragItem");
			image.style.pointerEvents = "none";
			child = image;
		}
		const wrapper = document.createElement("div");
		const Container = document.querySelector(".wrapperCanvas");

		const signTop = Container.scrollTop + Container.clientHeight / 2;

		wrapper.classList.add("position-absolute");
		// wrapper.id = `wrapper-${wrapperID}`;
		// wrapperID += 1;
		wrapper.style.width = "max-content";
		wrapper.style.height = "max-content";
		wrapper.style.padding = "5px";
		// wrapper.style.border = "1px dotted black";
		wrapper.style.transform = `translateY(${signTop}px)`;
		// yOffset = signTop;
		wrapper.classList.add("dragit");
		wrapper.addEventListener("dblclick", () => handleResize(wrapper));

		//appending child to the parent
		wrapper.appendChild(child);
		wrapper.setAttribute("data-xOffset", "0");
		wrapper.setAttribute("data-yOffset", signTop);
		wrapper.setAttribute("data-currentX", "0");
		wrapper.setAttribute("data-currentY", signTop);
		console.log(wrapper.getAttribute("data-yOffset"));

		e.target.appendChild(wrapper);

		dragItem = wrapper;

		//adding event listener to drag around
		Container.addEventListener("touchstart", dragStart, false);
		Container.addEventListener("touchend", dragEnd, false);
		Container.addEventListener("touchmove", drag, false);

		Container.addEventListener("mousedown", dragStart, false);
		Container.addEventListener("mouseup", dragEnd, false);
		Container.addEventListener("mousemove", drag, false);
	};

	// var currentX;
	// var currentY;
	// var initialX;
	// var initialY;
	// var xOffset = 0;
	// var yOffset = 0;
	function allowDrop(ev) {
		ev.preventDefault();
	}
	function dragging(ev) {
		if (ev.target.getAttribute("name") == "image") {
			ev.dataTransfer.setData(
				"base64String",
				ev.target.getAttribute("src")
			);
			ev.dataTransfer.setData("type", ev.target.getAttribute("name"));
		} else {
			ev.dataTransfer.setData("type", ev.target.getAttribute("name"));
		}
	}

	function dragStart(e) {
		if (e.type === "touchstart") {
		} else {
			console.log(e.clientX, e.target.getAttribute("data-yOffset"));
			e.target.setAttribute(
				"data-initialX",
				e.clientX - e.target.getAttribute("data-xOffset")
			);
			e.target.setAttribute(
				"data-initialY",
				e.clientY - e.target.getAttribute("data-yOffset")
			);
		}
		console.log(
			e.target.getAttribute("data-initialX"),
			e.target.getAttribute("data-initialY"),
			dragItem
		);
		if (e.target.classList.contains("dragit")) {
			active = true;
		}
	}

	function dragEnd(e) {
		e.target.setAttribute(
			"data-initialX",
			e.target.getAttribute("data-currentX")
		);
		e.target.setAttribute(
			"data-initialY",
			e.target.getAttribute("data-currentY")
		);

		active = false;
		console.log(e.target);
	}

	function drag(e) {
		e.preventDefault();
		if (active) {
			console.log(e.target.getAttribute("data-currentY"));
			e.preventDefault();

			if (e.type === "touchmove") {
				// currentX = e.touches[0].clientX - initialX;
				// currentY = e.touches[0].clientY - initialY;
				e.target.setAttribute(
					"data-currentX",
					e.touches[0].clientX -
						e.target.getAttribute("data-initialX")
				);
				e.target.setAttribute(
					"data-currentY",
					e.touches[0].clientY -
						e.target.getAttribute("data-initialY")
				);
			} else {
				e.target.setAttribute(
					"data-currentX",
					e.clientX - e.target.getAttribute("data-initialX")
				);
				e.target.setAttribute(
					"data-currentY",
					e.clientY - e.target.getAttribute("data-initialY")
				);
			}

			// xOffset = currentX;
			// yOffset = currentY;
			e.target.setAttribute(
				"data-xOffset",
				e.target.getAttribute("data-currentX")
			);
			e.target.setAttribute(
				"data-yOffset",
				e.target.getAttribute("data-currentY")
			);

			if (e.target.classList.contains("dragit"))
				setTranslate(
					e.target.getAttribute("data-currentX"),
					e.target.getAttribute("data-currentY"),
					e.target
				);
		}
	}

	function setTranslate(xPos, yPos, el) {
		console.log(xPos, yPos, el);
		el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
	}
	const handleSaveSignature = () => {
		let canvasSign = refs.toDataURL("image/png");
		localStorage.setItem("CanvasbaseUrl", canvasSign);
		setCanvBaseUrl(canvasSign);
		console.log(canvasSign);
		setShowPad(false);
	};
	const handleClear = () => {
		refs.clear();
	};
	const saveHandle = () => {
		const items = document.querySelectorAll(".dragit");
		// const items = document.querySelectorAll(".dynamicDragItem");
		let data = [];
		items.forEach((item, ind) => {
			const child = item.querySelector(".dynamicDragItem");
			console.log(child);
			let itemObj = {};
			itemObj.type = child.tagName;
			if (itemObj.type === "INPUT") {
				itemObj.value = child.value;
				// console.log(item.value);
			} else {
				itemObj.src = child.src;
			}
			const attrs = item.getAttributeNames().reduce((acc, name) => {
				return { ...acc, [name]: item.getAttribute(name) };
			}, {});
			itemObj.attrs = attrs;
			data.push(itemObj);
		});
		console.log(data);
		localStorage.setItem("dynamicInputs", JSON.stringify(data));
	};
	return (
		<div className='Pdfview vh-100'>
			<Modal show={showPad} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>Signature Pad</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='my-2 d-flex align-items-center justify-content-center'>
						<span
							className='me-2 btn btn-secondary'
							onClick={() => setupload(false)}>
							Draw
						</span>
						<span
							className='btn btn-secondary'
							onClick={() => setupload(true)}>
							Upload
						</span>
					</div>
					{!upload ? (
						<div
							className='border signaturepad d-flex align-items-center justify-content-center'
							style={{ width: "100%", height: "250px" }}>
							<ReactSignatureCanvas
								ref={(ref) => {
									if (ref != null) {
										// refs.push(ref);
										refs = ref;
									}
								}}
								penColor='black'
								canvasProps={{
									width: document.querySelector(".modal-body")
										?.offsetWidth,
									height: 250,
									className: ``,
								}}
							/>
						</div>
					) : (
						<div
							className='border signaturepad d-flex align-items-center justify-content-center'
							style={{ width: "100%", height: "250px" }}>
							Drag and drop or
							<input
								type='file'
								onChange={(e) => encodeImageFileAsURL(e)}
							/>
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClear}>
						Clear
					</Button>
					<Button variant='primary' onClick={handleSaveSignature}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
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
					<button
						onClick={saveHandle}
						className='btn btn-success me-3'>
						Save
					</button>
					<div
						onDragStart={dragging}
						draggable={true}
						className='Datefield'
						name='date'>
						Date
					</div>
					<img
						name='image'
						onDragStart={dragging}
						draggable={true}
						style={{ width: "30px" }}
						src={CanvbaseUrl}
						alt=''
						srcset=''
					/>
					<span onClick={handleShow}>Signature</span>
					<img
						name='image'
						onDragStart={dragging}
						draggable={true}
						style={{ width: "30px" }}
						src={baseUrl}
						alt=''
						srcset=''
					/>
					{/* <input
						type='file'
						onChange={(e) => encodeImageFileAsURL(e)}
					/> */}
					{/* <span className='btn btn-info me-3' onClick={handleSign}>
						{sign ? "Normal" : "Sign"}
					</span> */}
				</div>
			</div>

			<div
				onDragOver={allowDrop}
				onDrop={(e) => handleSignatureDrop(e)}
				className=' wrapperCanvas position-relative py-3 d-flex justify-content-center'
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
								pageNumber={index + 1}></Page>
						</div>
					))}
				</Document>
			</div>
		</div>
	);
}

export default Pdfview;
