import React, { useState } from "react";
import {
	GithubPicker,
	SketchPicker,
	PhotoshopPicker,
	AlphaPicker,
	SliderPicker,
	ChromePicker,
} from "react-color";
import { useDispatch } from "react-redux";
// import { setColor } from "../../../../Redux/ColorScheme";

export default function ColorPicker({ addColor }) {
	const dispatch = useDispatch();
	const [color, setcolor] = useState("#89CFF0");
	const handleChangeComplete = (color, event) => {
		// console.log(color.hex);
		setcolor(color.hex);
		addColor(color.hex);
		// dispatch(setColor(color.hex));
		// alert(color.background);
	};

	return (
		<div className='py-5 d-flex justify-content-center align-items-center'>
			<ChromePicker
				color={color}
				onChangeComplete={handleChangeComplete}
			/>
		</div>
	);
}
