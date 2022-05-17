import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
// import Tables from "./Tables/Tables";
import "./Users.css";
import TitleBar from "../Dashboard/TitleBar/TitleBar";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import UserTable from "./UserTable/UserTable";
import ProfileHeader from "../Dashboard/ProfileHeader/ProfileHeader";

export default function Users(props) {
	const location = useLocation();
	const [data, setData] = React.useState([]);
	const getData = () => {
		const userId = localStorage.getItem("userId");
	};
	React.useEffect(() => {
		getData();
	}, []);

	return (
		<div className='Users'>
			<ProfileHeader title='Users' />
			<UserTable />
		</div>
	);
}
