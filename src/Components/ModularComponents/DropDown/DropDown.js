import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { data } from "jquery";
import React, { useEffect, useRef } from "react";
import Search from "../Search/Search";
import "./DropDown.css";
import "./DropDown1.css";
import useWindowResize from "../../../CustomHooks/useWindowResize";

export default function DropDown(props) {
	const { width } = useWindowResize();
	const dropBtn = useRef(null);
	const [show, setShow] = React.useState(true);
	const [min, setMin] = React.useState(25);
	const [max, setMax] = React.useState(75);
	let c = 0;
	const handleclick = (e) => {
		const target = dropBtn.current;
		const dropBtns = document.querySelectorAll(".dropOptions");

		dropBtns.forEach((item, ind) => {
			if (target != item && item.classList.contains("d-flex")) {
				item.classList.remove("d-flex");
				item.classList.add("d-none");
			}
		});

		if (target.classList.contains("d-none")) {
			target.classList.remove("d-none");
			target.classList.add("d-flex");
			// console.log(target, show);
		} else if (target.classList.contains("d-flex")) {
			target.classList.remove("d-flex");
			target.classList.add("d-none");
			// console.log(target, show);
		}
		console.log(target, c, c % 2);
	};

	const sliderHandle = () => {
		const rangeInput = document.querySelectorAll(".range-input input");
		const priceInput = document.querySelectorAll(".price-input .inputbox");
		const progress = document.querySelector(".rangeSlider .progress");
		console.log(priceInput, rangeInput);
		const ageGap = 10;

		rangeInput.forEach((input) => {
			input.addEventListener("input", (e) => {
				let minVal = parseInt(rangeInput[0].value);
				let maxVal = parseInt(rangeInput[1].value);
				if (e.target.className === "range-min") {
					setMin(minVal);
				} else setMax(maxVal);

				if (maxVal - minVal < ageGap) {
					if (e.target.className === "range-min") {
						rangeInput[0].value = maxVal - ageGap;
					} else {
						rangeInput[1].value = minVal + ageGap;
					}
				} else {
					progress.style.left =
						(minVal / rangeInput[0].max) * 100 + "%";
					progress.style.right =
						100 - (maxVal / rangeInput[1].max) * 100 + "%";
				}
			});
		});
	};
	useEffect(() => {
		sliderHandle();
	}, []);
	const comp = () => {
		if (props.type === "normal") {
			return (
				<>
					<div
						style={{
							minHeight: "2rem",
							maxHeight: props.height - 3 + "rem",
							minWidth: "max-content",
							Width: "100%",
							// marginTop: "2.18rem",
						}}
						className='OptioninnerWrapper'>
						{props.data.map((item, ind) => (
							<div
								className={`ps-3 mb-${
									ind == props.data.length - 1 ? "0" : "3"
								}`}>
								<input
									style={{ marginRight: "27px" }}
									className=''
									type='checkbox'
									name={item.name}
									id={item.name}
								/>
								<label
									className='text-capitalize'
									htmlFor={item.name}>
									{item.name}
								</label>
							</div>
						))}
					</div>
				</>
			);
		} else if (props.type == "location") {
			return (
				<>
					<Search className={"w-100"} />

					<div
						style={{
							minHeight: "2rem",
							maxHeight: props.height - 10 + "rem",
							minWidth: "max-content",
							Width: "100%",
							marginTop: "2.18rem",
						}}
						className='OptioninnerWrapper'>
						{/* {comp()} */}
						{props.data.map((item, ind) => (
							<div
								className={` ps-2 mb-${
									ind == props.data.length - 1 ? "0" : "3"
								}`}>
								<input
									style={{ marginRight: "27px" }}
									className=''
									type='checkbox'
									name={item.name}
									id={item.name}
								/>
								<label
									className='text-capitalize'
									htmlFor={item.name}>
									{item.name}
								</label>
							</div>
						))}
					</div>
				</>
			);
		} else if (props.type == "age") {
			return (
				<div
					style={{
						minHeight: "2rem",
						maxHeight: props.height - 2 + "rem",
						minWidth: "max-content",
						Width: "100%",
						height: props.height - 2 + "rem",

						// marginTop: "2.18rem",
					}}
					className='OptioninnerWrapper d-flex align-items-center'>
					<div className='d-flex flex-column justify-content-between w-100'>
						<div className='d-flex justify-content-between align-items-center'>
							<h5 className='selectRange text-capitalize'>
								Select range
							</h5>
							<div className=' priceInput d-flex align-items-center justify-content-center '>
								<input
									className='inputbox d-flex align-items-center justify-content-center text-center'
									style={
										{
											// width: "3rem",
											// borderRadius: "20%",
											// maxWidth: "3rem",
										}
									}
									value={min}
									type='number'
								/>
								<span className='mx-2 selectRange'>to</span>
								<input
									className='inputbox d-flex align-items-center justify-content-center text-center'
									style={
										{
											// width: "3rem",
											// borderRadius: "20%",
										}
									}
									value={max}
									type='number'
								/>
							</div>
						</div>
						<div className='rangeWrapper mt-4'>
							<div className='rangeSlider'>
								<div className='progress'></div>
							</div>
							<div className='range-input'>
								<input
									className='range-min'
									type='range'
									value={min}
									min='1'
									max='100'
								/>
								<input
									className='range-max'
									type='range'
									value={max}
									min='1'
									max='100'
								/>
							</div>
							<div className='mt-4 w-100 d-flex justify-content-between align-items-center'>
								<span>1</span>
								<span>100</span>
							</div>
						</div>
					</div>
				</div>
			);
		}
	};

	return (
		<div className='position-relative'>
			<div className='dropBtn ' onClick={(e) => handleclick(e)}>
				<div
					style={{
						height: props.height + "rem",
						width:
							width <= 600 && props.type == "location"
								? "80vw"
								: props.width + "rem",
						padding: props.type === "age" ? "0 20px" : "",
					}}
					className={`dropOptions ${props.type} d-none flex-column`}
					ref={dropBtn}>
					{comp()}
				</div>
				<div className='text-capitalize  label'>{props.name}</div>
				<span>
					<FontAwesomeIcon icon={faAngleDown} />
				</span>
			</div>
		</div>
	);
}
