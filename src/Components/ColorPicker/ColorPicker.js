import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
	const [showPicker, setShowPicker] = React.useState(false);
	// const { color } = useSelector((state) => state.color);
	const HandleColorScheme = () => {
		setShowPicker(!showPicker);
	};

	return (
		<div className='colorPicking py-4 d-flex justify-content-between align-items-center w-100'>
			<p className='fw-bold m-0'>Color</p>
			{/* <input type='color' name='' id='' /> */}
			<div className='position-relative'>
				<div
					onClick={HandleColorScheme}
					className='colorPickWrapper d-flex align-items-center p-2 border'>
					<div
						className=' me-2'
						style={{
							width: "3rem",
							height: "1.5rem",
							backgroundColor: `${color}`,
						}}></div>
					<FontAwesomeIcon icon={faAngleDown} />
				</div>
				<div className='position-absolute' style={{ right: "0" }}>
					{showPicker ? (
						<ChromePicker
							color={color}
							onChangeComplete={handleChangeComplete}
						/>
					) : (
						""
					)}
				</div>
			</div>
			{/* <div className='py-5 '>
                    <ChromePicker
                        color={color}
                        onChangeComplete={handleChangeComplete}
                    />
                </div> */}
		</div>
	);
}
