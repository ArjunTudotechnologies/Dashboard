import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import TitleBar from "../Dashboard/TitleBar/TitleBar";
import "./Adduser.css";
import { NormalInputs, PassInputs } from "../ModularComponents/Inputs/Inputs";
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function Adduser() {
	const [cred, setCred] = useState({});

	const history = useHistory();
	const isRequiredFilled = (data) => {
		for (var item of Object.values(data)) {
			if (item.length === 0) return false;
		}
		return true;
	};
	const handleAddUser = () => {
		alert("safd");
		axios
			.post("https://calm-beyond-84616.herokuapp.com/SignUp", cred)
			.then((res) => {
				console.log(res.data);
				history.push("/dashboard/users");
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
			<div className='header'>
				<TitleBar title={"Add user"} />
				<div className='userProfile'>
					<img
						src='/assets/images/user.JPG'
						alt=''
						className='userImage img-fluid me-3'
					/>
					<FontAwesomeIcon icon={faAngleDown} />
				</div>
			</div>
			<div className='p-5 '>
				<div className='bg-white p-5 d-flex justify-content-center align-items-center'>
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
			</div>
		</div>
	);
}
