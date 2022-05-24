import React from "react";
import axios from "axios";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import { setLoading } from "../../../Redux/IsLoading";
import TaskTable from "./WorkflowTable/WorkflowTable";
import "./Workflow.css";

export default function Workflow(props) {
	const location = useLocation();
	const { fileid } = useParams();
	const dispatch = useDispatch();
	const [data, setData] = React.useState([]);
	const history = useHistory();

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
		console.log(history);
		getData();
	}, [fileid]);

	return (
		<div className='Workflow'>
			<ProfileHeader
				title={`Dashboard > ${location.state.folder} > ${location.state.file} > Flows`}
			/>
			<TaskTable item={data} callback={getData} />
		</div>
	);
}
