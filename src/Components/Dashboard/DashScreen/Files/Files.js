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

export default function Files() {
	const { loading } = useSelector((state) => state.loading);
	const [listData, setListData] = useState([]);
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
					<div className='col-4 '>File name</div>
					<div className='col-3 '>Folder name</div>
					<div className='col-3 '>Last viewed</div>
					<div className='col-2 '>Actions</div>
				</div>
				<div className='listItems'>
					{!heightLoading &&
						listData.map((item, ind) => {
							const date = new Date(item.data.updatedAt.seconds)
								.toLocaleString("en-Gb", { timeZone: "UTC" })
								.split(",")[0];
							console.log(date);
							const imgType = item.data.fileName.split(".")[1];

							return (
								<div className='d-flex flex-wrap tableItems'>
									<div className='col-4 d-flex align-items-center '>
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
										className='col-3 foldername d-flex align-items-center '
										style={{ color: item.data.color }}>
										{item.data.tags}
									</div>
									{/* <div className='col-2 filesize'>
											128KB
										</div> */}
									<div className='col-3 lastview d-flex align-items-center '>
										{date}
									</div>
									<div className='col-2   d-flex align-items-center'>
										<div className='d-flex align-items-center w-100'>
											<span
												className='col actionText '
												style={{
													cursor: "pointer",
												}}>
												<Link
													to={`${url}/viewpdf`}
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
												onClick={() =>
													deleteFile(item.docId)
												}
												className='col text-center'
												style={{
													cursor: "pointer",
												}}>
												<FontAwesomeIcon
													className='fa-1x'
													icon={faEllipsisVertical}
												/>
											</span>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}
