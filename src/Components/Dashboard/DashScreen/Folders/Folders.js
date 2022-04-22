import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import "./Folders.css";
import {
	faAngleDown,
	faEllipsisVertical,
	faFolderOpen,
	faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../../Redux/IsLoading";
import CreateFolderModal from "./CreateFolderModal/CreateFolderModal";
import { Link } from "react-router-dom";

export default function Folders() {
	const [modalShow, setModalShow] = React.useState(false);
	const [folderData, setFolderData] = React.useState([]);
	// const { userId } = useSelector((state) => state.loginInfo);

	const dispatch = useDispatch();
	const handleCreate = (name) => {
		const userId = localStorage.getItem("userId");
		console.log(userId);
		const data = {
			createdBy: userId,
			name,
		};
		axios
			.post("https://calm-beyond-84616.herokuapp.com/addUserFolder", data)
			.then((res) => setModalShow(false))
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		const userId = localStorage.getItem("userId");
		axios
			.get(
				`https://calm-beyond-84616.herokuapp.com/getUserFolder?userId=${userId}`
			)
			.then((res) => {
				// console.log(res.data);
				setFolderData(res.data);
				dispatch(setLoading(false));
			})

			.catch((err) => console.log(err));
	}, [folderData]);
	return (
		<div className='folders'>
			<CreateFolderModal
				show={modalShow}
				onHide={() => setModalShow(false)}
				onCreate={handleCreate}
			/>
			<div className='secHeader'>
				<div className='secTitle'>Folders</div>
				<div className='filter '>
					<span className='me-3'>Sort by</span>
					<FontAwesomeIcon icon={faAngleDown} />
				</div>
			</div>
			<div className='w-100 my-2'>
				<div className='folderStructure d-flex flex-wrap  w-100 justify-content-between'>
					<div className='col-md-9 col-12 row mb-2 g-2  g-sm-5 row-cols-2 row-cols-lg-4 '>
						{folderData.map((item, ind) => {
							return (
                                <Link to={{
                                    pathname:""
                                }}>
									<div className='col '>
										<div className='bg-white folderBox'>
											<div className='d-flex align-items-center justify-content-between mb-4'>
												<FontAwesomeIcon
													className='fa-2x '
													icon={faFolderOpen}
												/>
												{/* <FontAwesomeIcon
										className='fa-1x'
										icon={faEllipsisVertical}
									/> */}
											</div>
											<div className='mt-auto'>
												<h6 className='folderName '>
													{item.data.name}
												</h6>
												<div className='folderDetails d-flex justify-content-between align-items-center'>
													<div className='noOfFiles'>
														100 Files
													</div>
													{/* <div className='size'>100 MB</div> */}
												</div>
											</div>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
					<div className='col-md-3 g-3 col-12'>
						<div
							className=' folderBox align-items-center'
							style={{ cursor: "pointer" }}
							onClick={() => setModalShow(true)}>
							<div className='d-flex align-items-center justify-content-between'>
								<FontAwesomeIcon
									className='fa-4x '
									icon={faFolderPlus}
								/>
							</div>
							<div className='mt-3'>
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
				</div>
			</div>
		</div>
	);
}
