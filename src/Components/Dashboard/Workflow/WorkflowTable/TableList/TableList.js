import React from "react";

import { UilPen, UilTrashAlt, UilEllipsisV } from "@iconscout/react-unicons";
import { Link, useHistory } from "react-router-dom";

export default function TableList({
	heightLoading,
	listData,
	handleFuncShwow,
	ActivityModalShow,
	deleteFile,
}) {
	// console.log(listData);
	const history = useHistory();
	// const ShowTaskFlow = (fileId) => {
	// 	history.push(`/dashboard/taskFlow/${fileId}`);
	// };
	function getRandomColor() {
		var letters = "B1C2DEF6A".split("");
		var color = "#";
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * letters.length)];
		}
		return color;
	}
	return (
		<div className='listItems'>
			{!heightLoading &&
				listData.length > 0 &&
				listData.map((elem, ind) => {
					const date = new Date(
						elem.data.createdAt.seconds * 1000
					).toLocaleString("en-US", {
						month: "long",
						year: "numeric",
						day: "numeric",
					});

					const ListOfTask = elem.data.taskList;
					return (
						<div className='d-flex flex-wrap tableItems'>
							<div className='col-md-4 col-3 d-flex  align-items-center '>
								<span className='fw-bold'>
									{elem.data.workFlowName}
								</span>
							</div>
							<div className='col-3 d-flex fw-bold d-flex  align-items-center '>
								{date}
							</div>
							<div className='col-md-3  col-3 foldername d-flex  flex-wrap align-items-center'>
								{ListOfTask.map((item, ind) => {
									return item.userList.map((ele) => (
										<>
											<span
												className='d-inline-flex align-items-center justify-content-center text-white'
												style={{
													width: "2rem",
													height: "2rem",
													borderRadius: "50%",
													backgroundColor:
														getRandomColor(),
												}}>
												{ele.email.slice(0, 2)}
											</span>
										</>
									));
								})}
							</div>
							<div className='col-md-2 col-3 d-flex align-items-center '>
								<span
									className='me-3'
									style={{ cursor: "pointer" }}>
									<UilPen />
								</span>
								<span
									className='me-3'
									style={{ cursor: "pointer" }}>
									<UilTrashAlt />
								</span>
								<span style={{ cursor: "pointer" }}>
									<UilEllipsisV />
								</span>
							</div>
						</div>
					);
				})}
		</div>
	);
}
