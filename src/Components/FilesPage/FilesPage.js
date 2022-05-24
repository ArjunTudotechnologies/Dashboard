import React from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../Redux/IsLoading";
import "./FilesPage.css";
import Tables from "./Tables/Tables";
import ProfileHeader from "../Dashboard/ProfileHeader/ProfileHeader";

export default function FilesPage(props) {
	const location = useLocation();
	const { parent, folder, folderid } = useParams();
	const dispatch = useDispatch();
	const [data, setData] = React.useState([]);
	const getData = () => {
		const userId = localStorage.getItem("userId");
		console.log("edited");
		axios
			.get(
				`https://calm-beyond-84616.herokuapp.com/getUserFile?userId=${userId}&parent=${parent}&tags=${folder}`
			)
			.then((res) => {
				setData(res.data);
				dispatch(setLoading(false));
			})
			.catch((err) => {
				console.log(err);
			});
	};
	React.useEffect(() => {
		getData();
	}, []);

	const splits = folder.split("_");

	let name = "";
	splits.forEach((item, ind) => {
		name += item.charAt(0).toUpperCase() + item.slice(1) + " ";
	});
	return (
		<div className='FilesPage'>
			<ProfileHeader title={`Dashboard > ${parent} > ${folder}`} />
			<Tables
				item={data}
				folderId={folderid}
				callback={getData}
				params={useParams()}
			/>
		</div>
	);
}
