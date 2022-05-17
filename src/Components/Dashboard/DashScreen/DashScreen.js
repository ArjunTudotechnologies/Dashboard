import React from "react";
import "./DashScreen.css";
import Folders from "./Folders/Folders";
import Files from "./Files/Files";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../Redux/IsLoading";
import ProfileHeader from "../ProfileHeader/ProfileHeader";

export default function DashScreen() {
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(setLoading(true));
	}, []);
	return (
		<div className='dashScreen'>
			<ProfileHeader title='Home' />

			<Folders />
			<Files />
		</div>
	);
}
