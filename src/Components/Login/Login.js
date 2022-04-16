import React, { useEffect, useState } from "react";
import {
	Dropdown,
	DropdownButton,
	FormControl,
	InputGroup,
} from "react-bootstrap";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { getLogo, setLogo } from "../../Redux/LocalStorage";
import {
	NormalInputs,
	PassInputs,
	PhoneInputs,
} from "../ModularComponents/Inputs/Inputs";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

export default function Login() {
	const { logo } = useSelector((state) => state.logo);
	const dispatch = useDispatch();

	const [passIcon, setPassIcon] = useState(false);
	const [passType, setPassType] = useState(true);
	// const [loginLogo, setLoginLogo] = useState(null);
	useEffect(() => {
		dispatch(getLogo());
	}, [logo]);

	const setLocal = () => {
		dispatch(setLogo());
	};
	return (
		<div className='login position-relative'>
			<div className='mask1 position-absolute'></div>
			<div className='mask2 position-absolute'></div>
			<div className='inputs_wrapper'>
				<div className='d-flex justify-content-center my-3'>
					{logo ? (
						<div className='' style={{ width: "25%" }}>
							<img
								src={logo}
								className='img-fluid'
								alt=''
								srcset=''
							/>
						</div>
					) : (
						<div className='bg-secondary p-3 d-flex align-items-center justify-content-center w-50'>
							<h3 className='text-center m-0 '>LOGO</h3>
						</div>
					)}
				</div>
				<h3 className='text-center title'>Login</h3>
				<p className='text-center login_brief'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo
					aliquam, faucibus morbi ut.
				</p>
				<NormalInputs
					placeholder={"example@gmail.com"}
					label={"Email"}
					type={"email"}
				/>

				<PassInputs placeholder={"Password"} label={"Password"} />

				<Link
					to='/dashboard'
					onClick={setLocal}
					className='d-flex justify-content-center d-inline-block'>
					<a className=' mt-4 mb-3 custom_btn '>Login</a>
				</Link>
				<div className='text-center mt-4'>
					<a href='http://' target='_blank' rel='noopener noreferrer'>
						Forgot your password?
					</a>
				</div>
			</div>
		</div>
	);
}
