import React, { useState } from "react";
import ProfileHeader from "../Dashboard/ProfileHeader/ProfileHeader";
import TitleBar from "../Dashboard/TitleBar/TitleBar";
import { NormalInputs } from "../ModularComponents/Inputs/Inputs";
import DocGenerateModal from "./DocGenerateModal/DocGenerateModal";
import PreviewModal from "./PreviewModal/PreviewModal";
import "./TemplateDOC.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TemplateDOC() {
	const [modalShow, setModalShow] = React.useState(false);
	const [GenerateModal, setGenerateModal] = React.useState(false);
	const [templateText, setTemplateText] = React.useState(null);
	const [previewtext, setpreviewtext] = React.useState(null);
	const [editorvalue, setEditorvalue] = useState(" ");
	const AddTag = (e) => {
		const target = e.target.innerText;
		// const templateArea = document.querySelector("#templateArea");
		// templateArea.value += target;
		// const span = document.createElement("span");

		setEditorvalue((prev) => {
			console.log(prev);
			return prev.slice(0, prev.length - 4) + target + "</p>";
		});
	};
	const showTemplate = () => {
		setModalShow(true);
		// const templateArea = document.querySelector("#templateArea");
		// const templateAreaText = templateArea.value;

		// console.log(templateArea.value);

		const replacedText = editorvalue
			.replaceAll(`{ Name }`, "Zahin")
			.replaceAll(`{ Company }`, "Tudo technologies pvt. LTD.")
			.replaceAll(`{ Email }`, "abx@gmail.com")
			.replaceAll(`{ Address }`, "Bangalore, India");
		console.log(editorvalue);
		// setpreviewtext(value);
		setpreviewtext(replacedText);
		// templateArea.value = replacedText;
	};
	const DocGenerate = () => {
		setGenerateModal(true);
		// const templateArea = document.querySelector("#templateArea");
		// const templateAreaText = templateArea.value;
		setTemplateText(editorvalue);
		// setTemplateText(templateAreaText);
	};
	return (
		<div className='templatePage'>
			<PreviewModal
				text={previewtext}
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
			<DocGenerateModal
				template={templateText}
				show={GenerateModal}
				onHide={() => setGenerateModal(false)}
			/>

			{/* <ProfileHeader title={`Dashboard > Template`} />
			 */}
			<div className='header'>
				<TitleBar title={`Dashboard > Template`} />
				<div className='d-flex'>
					<button
						onClick={DocGenerate}
						className='btn btn-success me-2'>
						Doc Generate
					</button>
					<button onClick={showTemplate} className='btn btn-success'>
						Preview
					</button>
				</div>
			</div>
			<div className='p-4'>
				<NormalInputs
					type={"text"}
					label={"Template Name"}
					placeholder={"Give the template a name"}
				/>
				<div>
					<label for='' className='my-3'>
						Tags:
					</label>
					<div>
						<span
							onClick={AddTag}
							className='templateTag'>{`{  Name }`}</span>
						<span
							onClick={AddTag}
							className='templateTag'>{`{  Email }`}</span>
						{/* <span
							onClick={AddTag}
							className='templateTag'>{`{  Company }`}</span>
						<span
							onClick={AddTag}
							className='templateTag'>{`{  Address }`}</span> */}
					</div>
				</div>
				<div>
					<label for='templateArea' className='my-3'>
						Template:
					</label>

					{/* <textarea
						placeholder='Template here'
						className='p-4 w-100'
						id='templateArea'
						name='templateArea'
						rows='14'></textarea> */}
					<ReactQuill
						theme='snow'
						value={editorvalue}
						onChange={setEditorvalue}
						modules={{
							toolbar: [
								[{ header: [1, 2, false] }],
								[
									"bold",
									"italic",
									"underline",
									"strike",
									"blockquote",
								],
								[
									{ list: "ordered" },
									{ list: "bullet" },
									{ indent: "-1" },
									{ indent: "+1" },
								],
								["link", "image"],
								["clean"],
							],
						}}
						formats={[
							"header",
							"bold",
							"italic",
							"underline",
							"strike",
							"blockquote",
							"list",
							"bullet",
							"indent",
							"link",
							"image",
						]}
					/>
				</div>
			</div>
		</div>
	);
}
