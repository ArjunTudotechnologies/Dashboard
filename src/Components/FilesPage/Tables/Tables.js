import React, { useState, useEffect } from "react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UilPlus } from "@iconscout/react-unicons";
import firebase from "../../../Firebase/FirebaseConfig";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../Redux/IsLoading";
import { Spinner } from "react-bootstrap";
import ActivityMapperModal from "../../ActivityMapperModal/ActivityMapperModal";
import Table from "../../Dashboard/Table/Table";
import "./Tables.css";

const storage = firebase.storage();
const auth = firebase.auth();
const projectFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export default function Tables(props) {
	const [url, setUrl] = useState("");
	const [progress, setProgress] = useState(0);

	const [post, setPost] = useState("");
	const [fileId, setFileId] = useState(null);
	const [show, setShow] = React.useState(false);

	const [listData, setListData] = useState([]);
	const { loading } = useSelector((state) => state.loading);
	const dispatch = useDispatch();
	const [heightLoading, setHeightLoading] = useState(true);
	console.log(props.params);
	useEffect(() => {
		setListData(props.item);
		console.log(props, listData, heightLoading);
	}, [props.item, heightLoading]);

	React.useEffect(() => {
		dynamicHeight();
	}, []);
	const getInnerHeight = (elm) => {
		var computed = getComputedStyle(elm),
			padding =
				parseInt(computed.paddingTop) +
				parseInt(computed.paddingBottom);

		return elm.clientHeight - padding;
	};
	const ListItemHeight = () => {
		const parent = document.querySelector(".listWrapper");
		const parentHeight = getInnerHeight(parent);
		const header = document.querySelector(".listWrapper .tableHead");
		const target = document.querySelector(".listWrapper .listItems");
		target.style.height = parentHeight - header.clientHeight + "px";
		setHeightLoading(false);
	};
	const ListWrapperHeight = () => {
		const parent = document.querySelector(".files");
		const parentHeight = getInnerHeight(parent);
		const header = document.querySelector(".files .secHeader");
		const target = document.querySelector(".listWrapper");
		target.style.height = parentHeight - header.clientHeight + "px";
		ListItemHeight();
	};
	const dynamicHeight = () => {
		const parent = document.querySelector("body");
		const hearder = document.querySelector(".FilesPage .header");
		const computedHeight = parent.clientHeight - hearder.clientHeight;
		const target = document.querySelector(".FilesPage .files");
		target.style.height = computedHeight + "px";
		ListWrapperHeight();
	};
	const uploadHandle = () => {
		const uploadInput = document.querySelector("#fileupload");
		uploadInput.click();
	};

	const handleChange = (e) => {
		const targetFile = e.target.files[0];
		console.log(targetFile);
		if (targetFile) {
			handleUpload(targetFile);
		}
	};
	const handleUpload = (file) => {
		dispatch(setLoading(true));
		const uploadTask = storage.ref(`images/${file.name}`).put(file);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(progress);
			},
			(error) => {
				console.log(error);
			},
			() => {
				const userId = localStorage.getItem("userId");
				const color = localStorage.getItem("currentColor");
				storage
					.ref("images")
					.child(file.name)
					.getDownloadURL()
					.then((url) => {
						const filedata = {
							createdBy: userId,
							fileName: file.name,
							path: [
								{
									folderId: props.params.folderid,
									folderName: props.params.folder,
								},
							],
							parent: props.params.parent,
							url: url,
							tags: props.params.folder,
							color: color,
						};
						setUrl(url);

						axios
							.post(
								"https://calm-beyond-84616.herokuapp.com/addUserFile",
								filedata
							)
							.then((res) => {
								console.log(res.data);
								props.callback();
							})
							.catch((err) => console.log(err));
					});
				setPost("");
			}
		);
	};
	const deleteFile = (id) => {
		dispatch(setLoading(true));

		axios
			.delete(
				`https://calm-beyond-84616.herokuapp.com/deleteUserFile/${id}`
			)
			.then((res) => {
				props.callback();
			})
			.catch((err) => console.log(err));
	};
	const callback = () => {
		setShow(false);
	};
	const ActivityModalShow = (id) => {
		setShow(true);
		setFileId(id);
	};
	const handleFuncShwow = (e) => {
		const target = e.currentTarget.getAttribute("data-target");
		document.querySelector(`#${target}`).classList.toggle("d-none");
	};

	return (
		<div className='files '>
			<ActivityMapperModal
				show={show}
				Callbacks={callback}
				fileId={fileId}
			/>
			<div className='secHeader mb-3'>
				<div className='secTitle'>{props.params.folder}</div>
				<div className='filter '>
					<span className='me-3'>View All</span>
					<span>
						<span className='me-3'>Sort by</span>
						<FontAwesomeIcon icon={faAngleDown} />
					</span>
					{localStorage.getItem("isAdmin") === "true" && (
						<span
							onClick={uploadHandle}
							style={{ cursor: "pointer" }}
							className=' ms-3 btn btn-info text-white '>
							<input
								onChange={handleChange}
								type='file'
								id='fileupload'
								hidden
							/>
							<span className='me-2'>Upload file</span>
							<UilPlus size='16' color='#fff' />
						</span>
					)}
				</div>
			</div>
			<div className='listWrapper bg-white '>
				<div className='d-flex tableHead pb-2'>
					<div className='col-md-4 col-4'>File name</div>
					<div className='col-md-3 col-4'>Folder name</div>
					<div className='col-md-3 col-4 d-sm-block d-none'>
						Last viewed
					</div>
					<div className='col-md-2 col-4'>Actions</div>
				</div>

				{loading ? (
					<div className='d-flex align-items-center justify-content-center h-100'>
						<Spinner animation='border' role='status'>
							<span className='visually-hidden'>Loading...</span>
						</Spinner>
					</div>
				) : (
					<Table
						heightLoading={heightLoading}
						listData={listData}
						handleFuncShwow={handleFuncShwow}
						ActivityModalShow={ActivityModalShow}
						deleteFile={deleteFile}
					/>
				)}
			</div>
		</div>
	);
}
