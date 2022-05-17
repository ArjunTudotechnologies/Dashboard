import React, { useEffect, useState } from "react";
import {
	Dropdown,
	DropdownButton,
	FormControl,
	InputGroup,
	Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";
// import { useDispatch, useSelector } from "react-redux";
import { getLogo, setLogo } from "../../Redux/LocalStorage";
import {
	NormalInputs,
	PassInputs,
	PhoneInputs,
} from "../ModularComponents/Inputs/Inputs";
import { Link } from "react-router-dom";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import { setUserId, setIsAdmin } from "../../Redux/LoginInfo";
import { Loading } from "../../Redux/Loading";
import { setLoading } from "../../Redux/IsLoading";

export default function Login() {
	const { loading } = useSelector((state) => state.loading);

	const { logo } = useSelector((state) => state.logo);
	const dispatch = useDispatch();
	const history = useHistory();
	const [passIcon, setPassIcon] = useState(false);
	const [passType, setPassType] = useState(true);
	const [err, setErr] = useState(null);

	const { userId } = useSelector((state) => state.loginInfo);
	// const [loginLogo, setLoginLogo] = useState(null);
	useEffect(() => {
		console.log(userId);
		dispatch(getLogo());
	}, [logo, userId]);
	const [loginCred, SetLoginCred] = useState({});
	const CaptureValue = (e) => {
		// console.log(e.target.name);
		const name = e.target.name;
		const value = e.target.value;
		SetLoginCred((prev) => {
			const newData = { ...prev };
			newData[name.toLowerCase()] = value;
			return newData;
		});
	};
	const Handlelogin = () => {
		// dispatch(setLogo());
		const btn = document.querySelector(".custom_btn").diasbled;
		dispatch(setLoading(true));

		console.log(loginCred);
		axios
			.post("https://calm-beyond-84616.herokuapp.com/Login", loginCred)
			.then((res) => {
				// console.log(res.data);
				const LoginData = res.data;
				console.log(LoginData);
				dispatch(setLoading(false));

				if (LoginData.uid) {
					dispatch(setUserId(LoginData.uid));
					dispatch(setIsAdmin(LoginData.isAdmin));
					history.push("/dashboard");
				}
				setErr(null);
			})
			.catch((err) => {
				console.log(err);
				const errMsg = err.response.data.message;
				// alert(errMsg);
				setErr(errMsg);
				dispatch(setLoading(false));
			});
	};
	return (
		<div className='login position-relative'>
			{/* <div className='mask1 position-absolute'></div>
			<div className='mask2 position-absolute'></div> */}
			<div className='inputs_wrapper'>
				<div className='d-flex justify-content-center my-3'>
					<div className='' style={{ width: "25%" }}>
						<img
							src='/assets/images/logo.png'
							className='img-fluid'
							alt=''
							srcset=''
						/>
					</div>
				</div>
				<h3 className='text-center title'>Login</h3>
				<p className='text-center login_brief'>
					Please login to access the files
				</p>
				<NormalInputs
					onBlur={CaptureValue}
					placeholder={"example@gmail.com"}
					label={"Email"}
					type={"email"}
				/>

				<PassInputs
					onBlur={CaptureValue}
					placeholder={"Password"}
					label={"Password"}
				/>

				<span
					// to='/dashboard'

					className='d-flex justify-content-center d-inline-block text-white'>
					<span
						style={{ cursor: "pointer" }}
						onClick={Handlelogin}
						className=' mt-4 mb-3 custom_btn '>
						Login
					</span>
				</span>
				{loading ? (
					<div className='d-flex align-items-center justify-content-center'>
						<Spinner animation='border' role='status'>
							<span className='visually-hidden'>Loading...</span>
						</Spinner>
					</div>
				) : (
					""
				)}
				{err && (
					<div class='alert alert-danger' role='alert'>
						{err}
					</div>
				)}
				<div className='text-center mt-4'>
					<a href='http://' target='_blank' rel='noopener noreferrer'>
						Forgot your password?
					</a>
				</div>
			</div>
		</div>
	);
}
