import {
	faAngleDown,
	faDownload,
	faEllipsisVertical,
	faEye,
	faListDots,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./Files.css";
import useWrapperHeight from "../../../../CustomHooks/useWrapperHeight";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useRouteMatch } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import ActivityMapperModal from "../../../ActivityMapperModal/ActivityMapperModal";

export default function Files() {
	const { loading } = useSelector((state) => state.loading);
	const [listData, setListData] = useState([]);
	const [fileId, setFileId] = useState(null);
	const [show, setShow] = React.useState(false);

	const { path, url } = useRouteMatch();
	useEffect(() => {
		const userId = localStorage.getItem("userId");
		axios
			.get(
				`https://calm-beyond-84616.herokuapp.com/getUserFile?userId=${userId}`
			)
			.then((res) => setListData(res.data))
			.catch((err) => console.log(err));
	}, [listData]);

	const files = [
		{
			fileImg: "/assets/images/pdf.png",
			fileName: "Anupam Employee.pdf",
			fileSize: "128KB",
			lastViewed: "12/04/2020",
			folderName: "Personal data",
			folderColor: "#5784ed",
		},
		{
			fileImg: "/assets/images/pdf.png",
			fileName: "Ritesh deshmukh .pdf",
			fileSize: "128KB",
			lastViewed: "12/04/2020",
			folderName: "Invoices",
			folderColor: "#f8c83f",
		},
		{
			fileImg: "/assets/images/xls.png",
			fileName: "Saman Agarwal.xls",
			fileSize: "128KB",
			lastViewed: "12/04/2020",
			folderName: "Contact Details",
			folderColor: "#45cbd6",
		},
		{
			fileImg: "/assets/images/word.png",
			fileName: "Pooja.doc",
			fileSize: "128KB",
			lastViewed: "12/04/2020",
			folderName: "Agreements",
			folderColor: "#ef8bb1",
		},
		{
			fileImg: "/assets/images/pdf.png",
			fileName: "Anuska.pdf",
			fileSize: "128KB",
			lastViewed: "12/04/2020",
			folderName: "Invoices",
			folderColor: "#f8c83f",
		},
	];
	const [heightLoading, setHeightLoading] = React.useState(true);
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
		const hearder = document.querySelector(".header");
		const folders = document.querySelector(".folders");
		const computedHeight =
			parent.clientHeight - (hearder.clientHeight + folders.clientHeight);
		console.log(
			parent.clientHeight,
			hearder.clientHeight,
			folders.offsetHeight
		);
		const target = document.querySelector(".files");
		target.style.height = computedHeight + "px";
		ListWrapperHeight();
	};
	const deleteFile = (id) => {
		axios
			.delete(
				`https://calm-beyond-84616.herokuapp.com/deleteUserFile/${id}`
			)
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
	};
	const ActivityModalShow = (id) => {
		setShow(true);
		setFileId(id);
	};
	const handleFuncShwow = (e) => {
		const target = e.currentTarget.getAttribute("data-target");
		document.querySelector(`#${target}`).classList.toggle("d-none");
	};
	const callback = () => {
		setShow(false);
	};
	React.useEffect(() => {
		console.log(loading);
		if (!loading) {
			dynamicHeight();
			// setTimeout(() => {

			// }, 3000);
		}
	}, [loading]);
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
					<span className='me-3'>Sort by</span>
					<FontAwesomeIcon icon={faAngleDown} />
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
															height: "max-content",
															right: "0",
															top: "100%",
															zIndex: 500,
														}}>
														<span
															// onClick={() =>
															// 	ActivityModalShow(
															// 		item.docId
															// 	)
															// }
															className='py-2 w-100 border-bottom'>
															View task flow
														</span>
														<span
															onClick={() =>
																ActivityModalShow(
																	item.docId
																)
															}
															className='py-2 w-100 border-bottom'>
															Set Flow
														</span>
														<span
															onClick={() =>
																deleteFile(
																	item.docId
																)
															}
															className='py-2 w-100'>
															Delete
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
