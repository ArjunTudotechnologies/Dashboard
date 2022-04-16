import React from "react";
import "./TextAreaInput.css";

export default function TextAreaInput({
	required,
	placeholder,
	label,
	onBlur,
}) {
	return (
		<div className='form-group'>
			<label className='form-label' for='exampleFormControlTextarea1'>
				{label}
			</label>
			<textarea
				required={required}
				onBlur={onBlur}
				className='form-control'
				id='exampleFormControlTextarea1'
				placeholder={placeholder}
				rows='4'></textarea>
		</div>
	);
}
