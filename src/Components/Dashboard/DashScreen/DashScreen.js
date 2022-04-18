import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./DashScreen.css";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Folders from "./Folders/Folders";
import Files from "./Files/Files";

export default function DashScreen() {
	return (
		<div className='dashScreen'>
			<div className='header'>
				<div className='screenTitle'>Home</div>
				<div className='userProfile'>
					<img
						src='/assets/images/user.JPG'
						alt=''
						className='userImage img-fluid me-3'
					/>
					<FontAwesomeIcon icon={faAngleDown} />
				</div>
			</div>
			<Folders />
			<Files />
		</div>
	);
}
