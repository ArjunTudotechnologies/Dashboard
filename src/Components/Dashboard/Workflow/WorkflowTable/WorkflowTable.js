import React, { useState, useEffect } from "react";

import { UilAngleLeftB } from "@iconscout/react-unicons";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { setLoading } from "../../../../Redux/IsLoading";
import ActivityMapperModal from "../../../ActivityMapperModal/ActivityMapperModal";
import TableList from "./TableList/TableList";

export default function WorkflowTable(props) {
	const [fileId, setFileId] = useState(null);
	const [show, setShow] = React.useState(false);

	const [listData, setListData] = useState([]);
	const { loading } = useSelector((state) => state.loading);
	const dispatch = useDispatch();
	const [heightLoading, setHeightLoading] = useState(true);
	const history = useHistory();

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
		const parent = document.querySelector(".flow");
		const parentHeight = getInnerHeight(parent);
		const header = document.querySelector(".flow .secHeader");
		const target = document.querySelector(".listWrapper");
		target.style.height = parentHeight - header.clientHeight + "px";
		ListItemHeight();
	};
	const dynamicHeight = () => {
		const parent = document.querySelector("body");
		const hearder = document.querySelector(".Workflow .header");
		const computedHeight = parent.clientHeight - hearder.clientHeight;
		const target = document.querySelector(".Workflow .flow");
		target.style.height = computedHeight + "px";
		ListWrapperHeight();
	};

	const deleteFile = (id) => {
		dispatch(setLoading(true));

		axios
			.delete(
				`https://calm-beyond-84616.herokuapp.com/workFlowsDelete/${id}`
			)
			.then((res) => {
				props.callback();
				// dispatch(setLoading(false));
			})
			.catch((err) => console.log(err));
		// axios
		// 	.delete(
		// 		`https://calm-beyond-84616.herokuapp.com/deleteUserFile/${id}`
		// 	)
		// 	.then((res) => {
		// 		props.callback();
		// 	})
		// 	.catch((err) => console.log(err));
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
	const handleHistoryBack = () => {
		history.goBack();
	};
	return (
		<div className='flow '>
			<ActivityMapperModal
				show={show}
				Callbacks={callback}
				fileId={fileId}
			/>
			<div className='secHeader mb-3'>
				<div className='d-flex align-items-center'>
					<span
						onClick={handleHistoryBack}
						style={{ cursor: "pointer" }}>
						<UilAngleLeftB size='30' />
					</span>
					<div className='secTitle'>Workflows</div>
				</div>
			</div>
			<div className='listWrapper '>
				<div className='d-flex tableHead pb-2'>
					<div className='col-md-4 col-3'>Workflow details</div>
					<div className='col-md-3 col-3'>Created date</div>
					<div className='col-md-3 col-3 pe-1'>Users involved</div>
					<div className='col-md-2 col-3'>Actions</div>
				</div>

				{loading ? (
					<div className='d-flex align-items-center justify-content-center h-100'>
						<Spinner animation='border' role='status'>
							<span className='visually-hidden'>Loading...</span>
						</Spinner>
					</div>
				) : (
					<TableList
						heightLoading={heightLoading}
						listData={listData}
						handleFuncShwow={handleFuncShwow}
						ActivityModalShow={ActivityModalShow}
						deleteFile={deleteFile}
						updateDate={props.callback}
					/>
				)}
			</div>
		</div>
	);
}
