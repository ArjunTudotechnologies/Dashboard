import React from "react";
import { Button, Modal } from "react-bootstrap";
import { NormalInputs } from "../../../ModularComponents/Inputs/Inputs";

export default function UploadFileModal(props) {
	const [file, setFile] = React.useState(null);
	const [filename, setFilename] = React.useState(null);
	const [fileOriginalName, setFileOriginalName] = React.useState("");
	const [KeepOriginal, setKeepOriginal] = React.useState(false);
	React.useEffect(() => {}, []);
	const handleFilename = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFilename((prev) => {
			const newData = { ...prev };
			newData[name.toLowerCase()] = value;
			return newData;
		});
	};
	function renameFile(originalFile, newName) {
		return new File([originalFile], newName, {
			type: originalFile.type,
			lastModified: originalFile.lastModified,
		});
	}
	const uploadToserver = () => {
		const extention = file.name.split(".")[1];

		if (file && KeepOriginal) {
			props.handleUpload(file);
		} else {
			const newName = filename["file name"] + `.${extention}`;
			const newFile = renameFile(file, newName);
			props.handleUpload(newFile);
		}
		setFileOriginalName(null);
		setFilename("");
		setFile(null);
		setKeepOriginal(false);
		props.onHide();
	};
	const handleChange = (e) => {
		let targetFile = e.target.files[0];
		setFile(targetFile);
		setFileOriginalName(targetFile.name);
	};
	const handleFileSelect = () => {
		const uploadInput = document.querySelector("#fileupload");
		uploadInput.click();
	};
	const ObserveCheckBox = () => {
		const checkBox = document.querySelector("#keepOriginalName");
		if (checkBox.checked) {
			setKeepOriginal(true);
		} else {
			setKeepOriginal(false);
		}
	};
	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Upload file
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<input
					onChange={handleChange}
					type='file'
					id='fileupload'
					hidden
				/>
				<NormalInputs
					type='text'
					placeholder='File name'
					label='File Name'
					onBlur={handleFilename}
					disabled={KeepOriginal}
				/>
				<span onClick={ObserveCheckBox}>
					<label for='keepOriginalName' className='m-3 ms-0 fw-bold'>
						{" "}
						Keep original name
					</label>

					<input
						type='checkbox'
						id='keepOriginalName'
						name='keepOriginalName'
						value='true'
					/>
				</span>
				<div className='d-flex align-items-center '>
					<button
						className='btn btn-outline-success'
						onClick={handleFileSelect}>
						Select File
					</button>
					{file && <span className='ms-3'>{fileOriginalName}</span>}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={uploadToserver} disabled={file === null}>
					Upload
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
