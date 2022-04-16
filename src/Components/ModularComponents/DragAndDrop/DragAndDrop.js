import React from "react";
import "./DragAndDrop.css";
import { FileDrop } from "react-file-drop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowUpRightFromSquare,
	faFileUpload,
	faArrowUpFromSquare,
	faUpload,
	faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
export default function DragAndDrop() {
	const uploadHandle = () => {
		document.querySelector("#dragAndDropInput").click();
	};
	const fileUpload = (files) => {
		const file = files[0];
		console.log(file, file.name);
	};
	const ClickFileUpload = ({ target }) => {
		const file = target.files[0];
		console.log(file, file.name);
	};
	return (
		<div className='dragandDrop'>
			<input id='dragAndDropInput' type='file' hidden name='' />
			<FileDrop
				className='d-flex flex-column align-items-center justify-content-center h-100'
				onDrop={(files, event) => fileUpload(files)}>
				<div className='d-flex flex-column align-items-center justify-content-center h-100'>
					{/* <i class='fa-solid faArrowUpFromSquare'></i> */}
					<span>
						<img
							src='/assets/images/uploadIcon.png'
							alt=''
							className='img-fluid'
						/>
					</span>
					{/* <FontAwesomeIcon icon={faArrowUpFromBracket} /> */}
					<span>Drop your file to upload</span>
					<u
						onChange={ClickFileUpload}
						onClick={uploadHandle}
						style={{ cursor: "pointer" }}
						className='text-info '>
						Choose file
					</u>
				</div>
			</FileDrop>
		</div>
	);
}
