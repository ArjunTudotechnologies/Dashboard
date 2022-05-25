import React, { useEffect, useState } from "react";
import axios from "axios";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import ActivityMapperModal from "../../../ActivityMapperModal/ActivityMapperModal";
import Table from "../../Table/Table";
import "./Files.css";
import { setLoading } from "../../../../Redux/IsLoading";

export default function Files() {
	const { loading } = useSelector((state) => state.loading);
	const [listData, setListData] = useState([]);
	const [fileId, setFileId] = useState(null);
	const [show, setShow] = React.useState(false);
	const [heightLoading, setHeightLoading] = React.useState(true);

	const dispatch = useDispatch();
	const { path, url } = useRouteMatch();
	useEffect(() => {
		// console.log("sss");
		dataRetrive();
	}, []);
	React.useEffect(() => {
		console.log(loading);
		if (!loading) {
			dynamicHeight();
		}
	}, [loading]);

	const dataRetrive = () => {
		const userId = localStorage.getItem("userId");
        const isAdmin = localStorage.getItem("isAdmin") === "true";
        let queryString = `https://calm-beyond-84616.herokuapp.com/getUserFile`;
		// let queryString = `https://calm-beyond-84616.herokuapp.com/getUserFile?userId=${userId}`;
		// if (!isAdmin) {
		// 	queryString = `https://calm-beyond-84616.herokuapp.com/getUserFile`;
		// }
		axios
			.get(queryString)
			.then((res) => setListData(res.data))
			.catch((err) => console.log(err));
	};
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
		dispatch(setLoading(true));
		axios
			.delete(
				`https://calm-beyond-84616.herokuapp.com/deleteUserFile/${id}`
			)
			.then((res) => {
				dataRetrive();
				dispatch(setLoading(false));
			})
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
			<div className='listWrapper bg-white'>
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
