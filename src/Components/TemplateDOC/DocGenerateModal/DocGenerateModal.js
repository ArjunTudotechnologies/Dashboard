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
		const items = document.querySelectorAll(".pdfs");
		items.forEach((item, ind) => {
			item.parentElement.removeChild(item);
		});
		texts.forEach((item, ind) => {
			let element = document.createElement("div");
			// element.style.display = "none";
			element.classList.add("pdfs");
			element.classList.add("p-4");
			element.innerHTML = item;
			modalbody.current.append(element);
		});
		PdfMaking();
	};
	const PdfMaking = () => {
		const items = document.querySelectorAll(".pdfs");
		console.log(items);
		const pdfList = [];
		items.forEach((item, ind) => {
			//  html2canvas(item).then(async (canvas) => {
			// 		const imgData = canvas.toDataURL("image/jpeg");
			// 		const pdf = new jsPDF("p", "mm", "a4");
			// 		pdf.addImage(imgData, "JPEG", 10, 10);
			// 		await pdf.save(`download-${ind}.pdf`, { returnPromise: true });
			// 		await window.open(
			// 			pdf.output("bloburl", { filename: `download-${ind}.pdf` }),
			// 			"_blank"
			// 		);
			// 		pdf.output("bol");
			// 		pdfList.push(pdf);
			// 		const base64 = pdf.output("datauristring");
			// 		console.log(pdf.output("datauristring"));
			// 		pdfList.push(pdf.output("datauristring"));
			// 		window.open(pdf.output("bloburl"));
			// 		pdf.save(`download-${ind}.pdf`);
			// 	});
			let data;
			console.log(ind, item);
			html2canvas(item).then((canvas) => {
				var pdf = new jsPDF();
				var marginLeft = 20;
				var marginRight = 20;

				pdf.addImage(
					canvas.toDataURL("image/jpeg"),
					"jpeg",
					marginLeft,
					marginRight
				);
				data = pdf.output(
					"bloburl",
					{
						filename: `download-${ind}.pdf`,
					},
					{ returnPromise: true }
				);

				window.open(data, "_blank");
			});
		});
		// pdfList.forEach((item) => {
		// 	console.log("what");
		// 	window.open(item, "_blank");
		// 	// window.open(item.output("bloburl"));
		// });
		console.log(pdfList.length);
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
