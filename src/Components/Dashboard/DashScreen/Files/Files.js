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
import Table from "../../Table/Table";

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
