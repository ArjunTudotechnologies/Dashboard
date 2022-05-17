import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import TitleBar from "../TitleBar/TitleBar";
import "./ProfileHeader.css";

export default function ProfileHeader({ title }) {
	return (
		<div className='header'>
			<TitleBar title={title} />
			{/* <div className='userProfile'>
				<img
					src='/assets/images/user.JPG'
					alt=''
					className='userImage img-fluid me-3'
				/>
				<FontAwesomeIcon icon={faAngleDown} />
			</div> */}
		</div>
	);
}
