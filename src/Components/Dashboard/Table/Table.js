import {
	faDownload,
	faEllipsisVertical,
	faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

export default function Table({
	heightLoading,
	listData,
	handleFuncShwow,
	ActivityModalShow,
	deleteFile,
}) {
	const { pathname } = useLocation();
	const history = useHistory();
	const ShowTaskFlow = (fileId, filename, folderName) => {
		history.push(`/dashboard/Workflow/${fileId}`, {
			from: pathname,
			folder: folderName,
			file: filename,
		});
	};
	return (
		<div className='listItems'>
			{!heightLoading &&
				listData.map((item, ind) => {
					const date = new Date(item.data.updatedAt.seconds * 1000)
						.toLocaleString("en-Gb", {
							timeZone: "UTC",
						})
						.split(",")[0];
					const imgType = item.data.fileName.split(".")[1];

					return (
						<div className='d-flex flex-wrap tableItems'>
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
											<FontAwesomeIcon icon={faEye} />
										</Link>
									</span>

									<span
										className='col px-3 border-2 border-start text-center border-end actionText'
										style={{
											cursor: "pointer",
										}}>
										<FontAwesomeIcon icon={faDownload} />
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
											icon={faEllipsisVertical}
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
												onClick={() =>
													ShowTaskFlow(
														item.docId,
														item.data.fileName,
														item.data.tags
													)
												}
												className='py-2 w-100 border-bottom'>
												View Workflow
											</span>
											<span
												onClick={() =>
													ActivityModalShow(
														item.docId
													)
												}
												className='py-2 w-100 border-bottom'>
												Create Flow
											</span>
											<span
												onClick={() =>
													deleteFile(item.docId)
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
	);
}
