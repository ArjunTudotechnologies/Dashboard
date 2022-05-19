import {
	faAngleDown,
	faDownload,
	faEllipsisVertical,
	faEye,
	faListDots,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UilPlus } from "@iconscout/react-unicons";
import React, { useState, useEffect } from "react";
import "./Tables.css";
import firebase from "../../../Firebase/FirebaseConfig";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../Redux/IsLoading";
import { Spinner } from "react-bootstrap";
import ActivityMapperModal from "../../ActivityMapperModal/ActivityMapperModal";
import { Callbacks } from "jquery";

const storage = firebase.storage();
const auth = firebase.auth();
const projectFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export default function Tables(props) {
	const [url, setUrl] = useState("");
	const [progress, setProgress] = useState(0);
	const [docs, setDocs] = useState([]);
	const [userUID, setUserUID] = useState("");
	const [post, setPost] = useState("");
	const [fileId, setFileId] = useState(null);
	const [listData, setListData] = useState([]);
	const { loading } = useSelector((state) => state.loading);
	const dispatch = useDispatch();
	const [heightLoading, setHeightLoading] = useState(true);
	console.log(props.params);
	useEffect(() => {
		setListData(props.item);
		console.log(props, listData, heightLoading);
	}, [props.item, heightLoading]);

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
			// setFile(targetFile);
			handleUpload(targetFile);
		}
	};
	const handleUpload = (file) => {
		dispatch(setLoading(true));
		const uploadTask = storage.ref(`images/${file.name}`).put(file);
		const collectionRef = projectFireStore.collection("media");
		const collectionRefPost = projectFireStore.collection("post");
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
								// dispatch(setLoading(false));
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
				// console.log(res.data);
				// dispatch(setLoading(false));
			})
			.catch((err) => console.log(err));
	};
	const [show, setShow] = React.useState(false);
	const callback = () => {
		setShow(false);
	};
	const ActivityModalShow = (id) => {
		setShow(true);
		setFileId(id);
	};
	React.useEffect(() => {
		dynamicHeight();
	}, []);
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
				<div className='secTitle'>Files</div>
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
							// onClick={Handlelogin}
							className=' ms-3 btn btn-info text-white '>
							<input
								onChange={handleChange}
								type='file'
								id='fileupload'
								hidden
							/>
							<span className='me-2'>Add file</span>
							<UilPlus size='16' color='#fff' />
						</span>
					)}
				</div>
			</div>
			<div className='listWrapper '>
				<div className='d-flex tableHead pb-2'>
					<div className='col-md-4 col-4'>File name</div>
					<div className='col-md-3 col-4'>Folder name</div>
					<div className='col-md-3 col-4 d-sm-block d-none'>
						Last viewed
					</div>
					<div className='col-md-2 col-4'>Actions</div>
				</div>
				{loading ? (
					<div className='d-flex align-items-center justify-content-center'>
						<Spinner animation='border' role='status'>
							<span className='visually-hidden'>Loading...</span>
						</Spinner>
					</div>
				) : (
					<div className='listItems'>
						{!heightLoading &&
							listData.map((item, ind) => {
								const date = new Date(
									item.data.updatedAt.seconds
								)
									.toLocaleString("en-Gb", {
										timeZone: "UTC",
									})
									.split(",")[0];
								// console.log(date);
								const imgType =
									item.data.fileName.split(".")[1];

								return (
									<div
										// onClick={ActivityModalShow}
										className='d-flex flex-wrap tableItems'>
										<div className='col-md-4 col-4 d-flex align-items-center '>
											<span className='me-3'>
												<img
													style={{ width: "20px" }}
													src={`/assets/images/${imgType}.png`}
													alt=''
													className='img-fluid'
												/>
											</span>{" "}
											<span>{item.data.fileName}</span>
										</div>
										<div
											className='col-md-3 col-4 foldername d-flex align-items-center '
											style={{ color: item.data.color }}>
											{item.data.tags}
										</div>

										<div className='col-3 d-sm-block d-none lastview d-flex align-items-center '>
											{date}
										</div>
										<div className='col-md-2 col-4   d-flex align-items-center'>
											<div className='d-flex align-items-center w-100'>
												<span
													className='col actionText '
													style={{
														cursor: "pointer",
													}}>
													<Link
														to={`/dashboard/viewpdf`}
														className='d-inline-block'>
														<FontAwesomeIcon
															icon={faEye}
														/>
													</Link>
												</span>

												<span
													className='col px-3 border-2 border-start text-center border-end actionText'
													style={{
														cursor: "pointer",
													}}>
													<FontAwesomeIcon
														icon={faDownload}
													/>
												</span>

												<span
													// onClick={() =>
													// 	deleteFile(item.docId)
													// }
													onClick={handleFuncShwow}
													data-target={`item-${ind}`}
													className='col text-center position-relative'
													style={{
														cursor: "pointer",
													}}>
													<FontAwesomeIcon
														className='fa-1x'
														icon={
															faEllipsisVertical
														}
													/>
													<span
														className='d-flex flex-column bg-white position-absolute align-items-center justify-content-evenly d-none'
														id={`item-${ind}`}
														style={{
															width: "150px",
															height: "150px",
															right: "0",
															top: "100%",
															zIndex: 500,
														}}>
														<span
															onClick={() =>
																deleteFile(
																	item.docId
																)
															}
															className='btn btn-outline-danger'>
															Delete
														</span>
														<span
															onClick={() =>
																ActivityModalShow(
																	item.docId
																)
															}
															className='btn btn-outline-success'>
															Set Flow
														</span>
													</span>
												</span>
											</div>
										</div>
									</div>
								);
							})}
					</div>
				)}
			</div>
		</div>
	);
}
