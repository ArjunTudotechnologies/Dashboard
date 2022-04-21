import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./DashScreen.css";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import Folders from "./Folders/Folders";
import Files from "./Files/Files";
import Hamburger from "../../Hamburger/Hamburger";
import TitleBar from "../TitleBar/TitleBar";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../Redux/IsLoading";

export default function DashScreen() {
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(setLoading(true));
	}, []);
	return (
		<div className='dashScreen'>
			<div className='header'>
				<TitleBar title='Home' />
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
