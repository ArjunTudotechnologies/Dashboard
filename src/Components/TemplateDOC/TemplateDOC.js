import React from "react";
import ProfileHeader from "../Dashboard/ProfileHeader/ProfileHeader";
import TitleBar from "../Dashboard/TitleBar/TitleBar";
import { NormalInputs } from "../ModularComponents/Inputs/Inputs";
import PreviewModal from "./PreviewModal/PreviewModal";
import "./TemplateDOC.css";

export default function TemplateDOC() {
	const [modalShow, setModalShow] = React.useState(false);
	const [previewtext, setpreviewtext] = React.useState(null);
	const AddTag = (e) => {
		const target = e.target.innerText;
		const templateArea = document.querySelector("#templateArea");
		templateArea.value += target;
	};
	const showTemplate = () => {
		setModalShow(true);
		const templateArea = document.querySelector("#templateArea");
		const templateAreaText = templateArea.value;
		// console.log("====================================");
		console.log(templateArea.value);
		// console.log("====================================");
		const replacedText = templateAreaText
			.replaceAll(`{ Name }`, "Zahin")
			.replaceAll(`{ Company }`, "Tudo technologies pvt. LTD.")
			.replaceAll(`{ Title }`, "Junior Software Developer")
			.replaceAll(`{ Address }`, "Bangalore, India");
		// templateArea.value = replacedText;
		setpreviewtext(replacedText);
	};
	return (
		<div className='templatePage'>
			<PreviewModal
				text={previewtext}
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
			{/* <ProfileHeader title={`Dashboard > Template`} />
			 */}
			<div className='header'>
				<TitleBar title={`Dashboard > Template`} />
				<div>
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
							className='templateTag'>{`{  Title }`}</span>
						<span
							onClick={AddTag}
							className='templateTag'>{`{  Company }`}</span>
						<span
							onClick={AddTag}
							className='templateTag'>{`{  Address }`}</span>
					</div>
				</div>
				<div>
					<label for='templateArea' className='my-3'>
						Template:
					</label>

					<textarea
						placeholder='Template here'
						className='p-4 w-100'
						id='templateArea'
						name='templateArea'
						rows='14'></textarea>
				</div>
			</div>
		</div>
	);
}
