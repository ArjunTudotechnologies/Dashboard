import React from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import { setLoading } from "../../../Redux/IsLoading";
import TaskTable from "./TaskTable/TaskTable";
import "./Taskflow.css";

export default function Taslflow(props) {
	const location = useLocation();
	const { fileid } = useParams();
	const dispatch = useDispatch();
	const [data, setData] = React.useState([]);
	const getData = () => {
		axios
			.get(
				`https://calm-beyond-84616.herokuapp.com/getWorkFlows?fileId=${fileid}`
			)
			.then((res) => {
				console.log(res.data);
				setData(res.data);
				dispatch(setLoading(false));
			})
			.catch((err) => {
				console.log(err);
			});
	};
	React.useEffect(() => {
		getData();
	}, [fileid]);

	return (
		<div className='Taskflow'>
			<ProfileHeader title={"Task Flow"} />
			<TaskTable item={data} />
		</div>
	);
}
