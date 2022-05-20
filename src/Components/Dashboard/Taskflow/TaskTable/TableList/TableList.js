import React from "react";

import { UilSortAmountDown } from "@iconscout/react-unicons";
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
	const ShowTaskFlow = (fileId) => {
		history.push(`/dashboard/taskFlow/${fileId}`);
	};

	return (
		<div className='listItems'>
			{/* {console.log(listData)} */}
			{!heightLoading &&
				listData.length > 0 &&
				listData[0].data.taskList.map((item, ind) => {
					const date = new Date(listData[0].data.createdAt.seconds)
						.toLocaleString("en-Gb", {
							timeZone: "UTC",
						})
						.split(",")[0];
					// const imgType = item.data.fileName.split(".")[1];
					console.log(item);
					return (
						<div className='d-flex flex-wrap tableItems'>
							<div className='col-md-3 col-3 d-flex align-items-center '>
								<span>{item.action[0].name}</span>
							</div>

							<div className='col-3 d-flex lastview d-flex  align-items-center '>
								{date}
							</div>
							<div className='col-md-3 col-3 foldername d-flex align-items-center '>
								Ongoing
							</div>
							<div className='col-md-3 col-3   d-flex flex-wrap align-items-center'>
								{item.userList.map((ele) => (
									<p>{ele.email}</p>
								))}
							</div>
							{/* {console.log(item.userList)} */}
							{/* {item.userList.length < 2 && (
								<div className='d-flex justify-content-end w-100'>
									<UilSortAmountDown />
								</div>
							)} */}
						</div>
					);
				})}
		</div>
	);
}
