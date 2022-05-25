import React, { useEffect } from "react";
import axios from "axios";
import { UilFolder, UilPlus } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../../Redux/IsLoading";
import { Link, useRouteMatch } from "react-router-dom";
import CreateFolderModal from "./CreateFolderModal/CreateFolderModal";
import "./Folders.css";

export default function Folders() {
	const [modalShow, setModalShow] = React.useState(false);
	const [folderData, setFolderData] = React.useState([]);
	let { path, url } = useRouteMatch();
	const { Loading } = useSelector((state) => state.loading);

	const dispatch = useDispatch();
	const handleCreate = (createData) => {
		dispatch(setLoading(true));
		const userId = localStorage.getItem("userId");
		console.log(userId);
		const data = {
			createdBy: userId,
			...createData,
		};
		axios
			.post("https://calm-beyond-84616.herokuapp.com/addUserFolder", data)
			.then((res) => {
				dispatch(setLoading(false));
				setModalShow(false);
				getData();
			})
			.catch((err) => console.log(err));
	};
	const getData = () => {
		const userId = localStorage.getItem("userId");
        const isAdmin = localStorage.getItem("isAdmin") === "true";
        let queryString = `https://calm-beyond-84616.herokuapp.com/getUserFolder`;
		// let queryString = `https://calm-beyond-84616.herokuapp.com/getUserFolder?userId=${userId}`;
		// if (!isAdmin) {
		// 	queryString = `https://calm-beyond-84616.herokuapp.com/getUserFolder`;
		// }
		axios
			.get(queryString)
			.then((res) => {
				// console.log(res.data);
				setFolderData(res.data);
				dispatch(setLoading(false));
			})

			.catch((err) => console.log(err));
	};
	useEffect(() => {
		getData();
	}, []);
	return (
		<div className='folders'>
			<CreateFolderModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				onCreate={handleCreate}
			/>
			<div className='secHeader'>
				<div className='secTitle'>Recent Folders</div>
				{/* <div className='filter '>
					<span className='me-3'>Sort by</span>
					<FontAwesomeIcon icon={faAngleDown} />
				</div> */}
			</div>
			<div className='w-100 my-2'>
				<div className='folderStructure d-flex flex-wrap  w-100 justify-content-between'>
					<div className='col-md-9 col-12 row mb-2 g-2  g-sm-5 row-cols-2 row-cols-lg-4 '>
						{folderData.map((item, ind) => {
							return (
								<Link
									to={{
										pathname: `${url}/${item.data.parent}/${item.data.name}/${item.docId}`,
										color: item.data.color,
									}}>
									<div
										onClick={() =>
											localStorage.setItem(
												"currentColor",
												item.data.color
											)
										}
										className='col '>
										<div className='bg-white folderBox'>
											<div className='d-flex align-items-center justify-content-center '>
												<div
													className='d-flex align-items-center justify-content-center'
													style={{
														color: item.data.color,
														width: "50px",
														height: "50px",
														borderRadius: "50%",
														background:
															"rgba(217, 217, 217, 0.31)",
													}}>
													<UilFolder size={"44%"} />
												</div>
												{/* <FontAwesomeIcon
										className='fa-1x'
										icon={faEllipsisVertical}
									/> */}
											</div>
											<div className='mt-auto'>
												<h6 className='folderName fw-bold '>
													{item.data.name}
												</h6>
												<div className='folderDetails d-flex justify-content-between align-items-center'>
													<div className='noOfFiles'>
														100 Files
													</div>
													{/* <div className='size'>100 MB</div>  */}
												</div>
											</div>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
					{localStorage.getItem("isAdmin") === "true" && (
						<div className='col-md-3 g-3 col-12'>
							<div
								className=' folderBox align-items-center bg-dark text-white'
								style={{ cursor: "pointer" }}
								onClick={() => setModalShow(true)}>
								<div className='d-flex align-items-center justify-content-between'>
									{/* <FontAwesomeIcon
										className='fa-4x '
										icon={faFolderPlus}
									/> */}
									<div
										className='d-flex align-items-center justify-content-center'
										style={{
											width: "50px",
											height: "50px",
											borderRadius: "50%",
											background:
												"rgba(217, 217, 217, 0.31)",
										}}>
										<UilPlus size={"44%"} />
									</div>
								</div>
								<div className='mt-3 '>
									<h6 className='folderName   fw-bolder'>
										Create New Folder
									</h6>
									{/* <div className='folderDetails d-flex justify-content-between align-items-center'>
									<div className='noOfFiles'>200 Files</div>
									<div className='size'>100 MB</div>
								</div> */}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
