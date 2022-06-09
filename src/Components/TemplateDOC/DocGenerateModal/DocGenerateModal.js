import React, { useEffect, useRef, useState } from "react";
import * as ReactDOMServer from "react-dom/server";
import "./DocGenerateModal.css";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function DocGenerateModal(props) {
	const [step, setStep] = useState(1);
	const [users, setUsers] = useState([]);
	const [Selectedusers, setSelectedusers] = useState([]);
	const [allFiles, setAllFiles] = useState([]);
	const modalbody = useRef();
	const getUsers = () => {
		axios
			.get("https://calm-beyond-84616.herokuapp.com/Users")
			.then((res) => setUsers(res.data))
			.catch((err) => console.log(err));
	};
	const SelectedUser = (userData) => {
		setSelectedusers((prev) => [...prev, userData]);
	};
	const GoNext = () => {
		let text = [];
		Selectedusers.map((item, ind) => {
			const replacedText = props.template
				.replaceAll(`{ Name }`, item.name)
				.replaceAll(`{ Email }`, item.email);
			text.push(replacedText);
		});
		console.log(text);
		setAllFiles(text);
		printDocument(text);
		// exportPDF(text);
	};
	// const exportPDF = (text) => {
	// 	let element = (
	// 		<div dangerouslySetInnerHTML={{ __html: text }} style={{}}></div>
	// 	);
	// const doc = new jsPDF("p", "pt", "letter");
	// doc.html(ReactDOMServer.renderToString(element), {
	// 	callback: function (doc) {
	// 		doc.save("sample.pdf");
	// 	},
	// });
	// };
	const printDocument = (texts) => {
		texts.forEach((item, ind) => {
			// let element = (
			// 	<div
			// 		className='pdfs d-none'
			// 		dangerouslySetInnerHTML={{ __html: item }}></div>
			// );
			let element = document.createElement("div");
			// element.style.display = "none";
			element.classList.add("pdfs");
			element.innerHTML = item;
			modalbody.current.append(element);
			PdfMaking();
			// ReactDOMServer.
			// const comp = document.createElement("div");
			// comp.innerHTML = item;
			// comp.style.display = "none";
			// const doc = new jsPDF("p", "pt", "letter");
			// doc.html(ReactDOMServer.renderToStaticMarkup(element), {
			// 	callback: function (doc) {
			// 		doc.save("sample.pdf");
			// 	},
			// });
			// html2canvas(ReactDOMServer.renderToString(element)).then(
			// 	(canvas) => {
			// 		const imgData = canvas.toDataURL("image/png");
			// 		const pdf = new jsPDF();
			// 		pdf.addImage(imgData, "JPEG", 0, 0);
			// 		pdf.save(`download-${ind}.pdf`);
			// 	}
			// );
		});
	};
	const PdfMaking = () => {
		const items = document.querySelectorAll(".pdfs");
		console.log(items);
		let pdfList = [];
		items.forEach((item, ind) => {
			html2canvas(item).then((canvas) => {
				const imgData = canvas.toDataURL("image/png");
				const pdf = new jsPDF();
				pdf.addImage(imgData, "JPEG", 0, 0);
				pdfList.push(pdf);
				// pdf.save(`download-${ind}.pdf`);
			});
		});
		console.log(pdfList);
	};
	useEffect(() => {
		getUsers();
	}, []);
	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Document Generate
				</Modal.Title>
			</Modal.Header>
			<Modal.Body ref={modalbody}>
				<div className='p-5'>
					<div className='fs-5 fw-bold'>Select users</div>
					<div className='fs-4'>
						{users.map((user, ind) => (
							<label
								htmlFor={`checkbox-${ind + 1}`}
								className='d-flex align-items-center my-2'>
								<input
									onChange={() => SelectedUser(user.data)}
									id={`checkbox-${ind + 1}`}
									type='checkbox'
								/>{" "}
								<span className='ms-2'>{user.data.email}</span>
							</label>
						))}
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
				{step == 1 ? (
					<Button onClick={GoNext}>Next</Button>
				) : (
					<Button onClick={props.onHide}>Done</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
}
