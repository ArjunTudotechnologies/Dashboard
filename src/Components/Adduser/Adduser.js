import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import TitleBar from "../Dashboard/TitleBar/TitleBar";
import "./Adduser.css";
import { NormalInputs, PassInputs } from "../ModularComponents/Inputs/Inputs";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
export default function Adduser(props) {
	const [cred, setCred] = useState({});

	const history = useHistory();
	const isRequiredFilled = (data) => {
		for (var item of Object.values(data)) {
			if (item.length === 0) return false;
		}
		return true;
	};
	const handleAddUser = () => {
		// alert("safd");
		console.log(cred);
		axios
			.post("https://calm-beyond-84616.herokuapp.com/SignUp", cred)
			.then((res) => {
				console.log(res.data);
				history.push("/dashboard/users");
				props.Callbacks();
			})
			.catch((err) => console.log(err));
	};
	const newUserCred = (e) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;

		setCred((prev) => {
			const newData = { ...prev };
			// console.log(newData);
			newData[name.toLowerCase()] = value;
			const check = isRequiredFilled(newData);
			// console.log(check);
			if (check) {
				document.querySelector(".addbtn").disabled = false;
			} else document.querySelector(".addbtn").disabled = true;
			return newData;
		});
	};
	return (
		<div className='adduser '>
			<Modal
				centered
				// show={true}
				show={props.show}
				fullscreen={"md-down"}
				onHide={() => props.Callbacks()}>
				<Modal.Header closeButton>
					<Modal.Title>Add user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className=' '>
						<div className='bg-white d-flex justify-content-center align-items-center'>
							<div className='add_form w-100'>
								<NormalInputs
									type='text'
									required={true}
									placeholder='Name'
									label='Name'
									onBlur={newUserCred}
								/>
								<NormalInputs
									type='email'
									required={true}
									placeholder='Email'
									label='Email'
									onBlur={newUserCred}
								/>
								<PassInputs
									onBlur={newUserCred}
									placeholder={"Password"}
									label={"Password"}
									required={true}
								/>
								<div
									onClick={handleAddUser}
									className=' d-flex justify-content-center my-2'>
									<button
										className='btn btn-success addbtn w-100'
										disabled>
										Add User
									</button>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
			{/* <div className='p-sm-5 p-3 '>
				<div className='bg-white p-sm-5 p-2 d-flex justify-content-center align-items-center'>
					<div className='add_form'>
						<NormalInputs
							type='text'
							required={true}
							placeholder='Name'
							label='Name'
							onBlur={newUserCred}
						/>
						<NormalInputs
							type='email'
							required={true}
							placeholder='Email'
							label='Email'
							onBlur={newUserCred}
						/>
						<PassInputs
							onBlur={newUserCred}
							placeholder={"Password"}
							label={"Password"}
							required={true}
						/>
						<div
							onClick={handleAddUser}
							className=' d-flex justify-content-center my-2'>
							<button
								className='btn btn-success addbtn w-100'
								disabled>
								Add User
							</button>
						</div>
					</div>
				</div>
			</div> */}
		</div>
	);
}
