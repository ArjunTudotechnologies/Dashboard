import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Tables from "./Tables/Tables";
import "./FilesPage.css";
import TitleBar from "../Dashboard/TitleBar/TitleBar";
import { useLocation, useParams } from "react-router-dom";

export default function FilesPage(props) {
	const location = useLocation();
	const { folderName } = useParams();
	const [folderId, setfolderId] = React.useState(location.parentId);
	// console.log(location.parentId);
	React.useEffect(() => {}, []);

	const splits = folderName.split("_");
	// console.log(splits);
	let name = "";
	splits.forEach((item, ind) => {
		name += item.charAt(0).toUpperCase() + item.slice(1) + " ";
	});
	return (
		<div className='FilesPage'>
			<div className='header'>
				<TitleBar title={name} />
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
