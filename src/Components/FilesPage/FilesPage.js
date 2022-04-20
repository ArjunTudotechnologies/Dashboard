import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
// import "./DashScreen.css";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
// import Files from "../Dashboard/DashScreen/Files/Files";
import Tables from "./Tables/Tables";
// import Folders from "./Folders/Folders";
// import Files from "./Files/Files";
import "./FilesPage.css";
import TitleBar from "../Dashboard/TitleBar/TitleBar";

export default function FilesPage() {
	return (
		<div className='FilesPage'>
			<div className='header'>
				{/* <div className='screenTitle'>Files</div> */}
				<TitleBar title='Files' />
				<div className='userProfile'>
					<img
						src='/assets/images/user.JPG'
						alt=''
						className='userImage img-fluid me-3'
					/>
					<FontAwesomeIcon icon={faAngleDown} />
				</div>
			</div>
			<Tables />
		</div>
	);
}
