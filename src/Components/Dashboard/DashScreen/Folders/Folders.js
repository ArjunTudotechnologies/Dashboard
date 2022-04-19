import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Folders.css";
import {
	faAngleDown,
	faEllipsisVertical,
	faFolderOpen,
	faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function Folders() {
	return (
		<div className='folders'>
			<div className='secHeader'>
				<div className='secTitle'>Folders</div>
				<div className='filter '>
					<span className='me-3'>Sort by</span>
					<FontAwesomeIcon icon={faAngleDown} />
				</div>
			</div>
			<div className='w-100 my-2'>
				<div className='folderStructure d-flex flex-wrap  w-100 justify-content-between'>
					<div className='col-md-9 col-12 row mb-2  g-5 row-cols-1 row-cols-lg-4 '>
						<div className='col '>
							<div className='bg-white folderBox'>
								<div className='d-flex align-items-center justify-content-between'>
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
									<h6 className='folderName'>
										Personal Data
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
						<div className='col '>
							<div className='bg-white folderBox'>
								<div className='d-flex align-items-center justify-content-between'>
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
									<h6 className='folderName'>
										Contact Details
									</h6>
									<div className='folderDetails d-flex justify-content-between align-items-center'>
										<div className='noOfFiles'>
											200 Files
										</div>
										{/* <div className='size'>100 MB</div> */}
									</div>
								</div>
							</div>
						</div>
						<div className='col '>
							<div className='bg-white folderBox'>
								<div className='d-flex align-items-center justify-content-between'>
									<FontAwesomeIcon
										className='fa-2x'
										icon={faFolderOpen}
									/>
									{/* <FontAwesomeIcon
										className='fa-1x'
										icon={faEllipsisVertical}
									/> */}
								</div>
								<div className='mt-auto'>
									<h6 className='folderName'>Invoices</h6>
									<div className='folderDetails d-flex justify-content-between align-items-center'>
										<div className='noOfFiles'>
											120 Files
										</div>
										{/* <div className='size'>100 MB</div> */}
									</div>
								</div>
							</div>
						</div>
						<div className='col '>
							<div className='bg-white folderBox'>
								<div className='d-flex align-items-center justify-content-between'>
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
									<h6 className='folderName'>Agreements</h6>
									<div className='folderDetails d-flex justify-content-between align-items-center'>
										<div className='noOfFiles'>
											250 Files
										</div>
										{/* <div className='size'>100 MB</div> */}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col-md-3 g-3 col-12'>
						<div className=' folderBox align-items-center'>
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
