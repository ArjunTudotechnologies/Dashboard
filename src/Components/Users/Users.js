import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
// import Tables from "./Tables/Tables";
import "./Users.css";
import TitleBar from "../Dashboard/TitleBar/TitleBar";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

export default function Users(props) {
	const location = useLocation();
	// const { parent, folder, folderid } = useParams();
	const [data, setData] = React.useState([]);
	const getData = () => {
		const userId = localStorage.getItem("userId");
		// axios
		// 	.get(
		// 		`https://calm-beyond-84616.herokuapp.com/getUserFile?userId=${userId}&parent=${parent}&tags=${folder}`
		// 	)
		// 	.then((res) => {
		// 		setData(res.data);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	};
	React.useEffect(() => {
		getData();
		// console.log(localStorage.getItem("currentColor"));
	}, []);

	// const splits = folder.split("_");

	// let name = "";
	// splits.forEach((item, ind) => {
	// 	name += item.charAt(0).toUpperCase() + item.slice(1) + " ";
	// });
	return (
		<div className='FilesPage'>
			<div className='header'>
				<TitleBar title={"Users"} />
				<div className='userProfile'>
					<img
						src='/assets/images/user.JPG'
						alt=''
						className='userImage img-fluid me-3'
					/>
					<FontAwesomeIcon icon={faAngleDown} />
				</div>
			</div>
			{/* <Tables
				item={data}
				folderId={folderid}
				callback={getData}
				params={useParams()}
			/> */}
		</div>
	);
}
