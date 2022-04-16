import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./UploadInput.css";
export default function UploadInput({ Btntype, disable }) {
	const uploadHandle = () => {
		document.querySelector("#uploadFile").click();
	};
	const fileUpload = ({ target }) => {
		const file = target.files[0];
		console.log(file, file.name);
		disable(false);
	};
	return (
		<div className='uploadingWrapper d-flex w-100 align-items-center justify-content-between'>
			<div className='col'>
				<h4 className='title fw-bold text-capitalize'>
					{Btntype === "Upload" && "Upload"} id proof
				</h4>
				{Btntype === "Re-Upload" ? (
					<div className='d-flex text-info'>
						<a target='_blank' href='#'>
							view
						</a>
						<span className='mx-2'>|</span>
						<a href='#' rel='noreferrer' download>
							download
						</a>
					</div>
				) : (
					""
				)}
				<p className='text'>
					(Document to be uploaded should be in pdf format and the
					file size should be 5MB only)
				</p>
			</div>
			<div
				style={{ cursor: "pointer" }}
				className='col text-end'
				onClick={uploadHandle}>
				<input
					onChange={fileUpload}
					hidden
					className=''
					id='uploadFile'
					style={{ width: "0" }}
					type='file'
					name=''
				/>
				<span className='uploadBtn  text-end '>
					{/* <FontAwesomeIcon icon={faCloudArrowUp} /> */}
					<span className='d-flex align-items-center justify-content-center'>
						<img
							src='/assets/images/upload.svg'
							alt=''
							className='img-fluid'
						/>
					</span>
					<span className='ms-2 text'>{Btntype}</span>
				</span>
			</div>
		</div>
	);
}
