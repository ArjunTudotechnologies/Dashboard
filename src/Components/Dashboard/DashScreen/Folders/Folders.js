import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Folders.css";
import {
	faAngleDown,
	faEllipsisVertical,
	faFolderOpen,
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
			<div>
				<div className='row g-5 row-cols-2 row-cols-lg-5'>
					<div className='col '>
						<div className='bg-white folderBox'>
							<div className='d-flex align-items-center justify-content-between'>
								<FontAwesomeIcon
									className='fa-2x text-info'
									icon={faFolderOpen}
								/>
								<FontAwesomeIcon
									className='fa-1x'
									icon={faEllipsisVertical}
								/>
							</div>
							<div className='mt-auto'>
								<h6 className='folderName'>Personal Data</h6>
								<div className='folderDetails d-flex justify-content-between align-items-center'>
									<div className='noOfFiles'>200 Files</div>
									<div className='size'>100 MB</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col '>
						<div className='bg-white folderBox'>
							<div className='d-flex align-items-center justify-content-between'>
								<FontAwesomeIcon
									className='fa-2x text-secondary'
									icon={faFolderOpen}
								/>
								<FontAwesomeIcon
									className='fa-1x'
									icon={faEllipsisVertical}
								/>
							</div>
							<div className='mt-auto'>
								<h6 className='folderName'>Contact Details</h6>
								<div className='folderDetails d-flex justify-content-between align-items-center'>
									<div className='noOfFiles'>200 Files</div>
									<div className='size'>100 MB</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col '>
						<div className='bg-white folderBox'>
							<div className='d-flex align-items-center justify-content-between'>
								<FontAwesomeIcon
									className='fa-2x text-warning'
									icon={faFolderOpen}
								/>
								<FontAwesomeIcon
									className='fa-1x'
									icon={faEllipsisVertical}
								/>
							</div>
							<div className='mt-auto'>
								<h6 className='folderName'>Attendence</h6>
								<div className='folderDetails d-flex justify-content-between align-items-center'>
									<div className='noOfFiles'>200 Files</div>
									<div className='size'>100 MB</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col '>
						<div className='bg-white folderBox'>
							<div className='d-flex align-items-center justify-content-between'>
								<FontAwesomeIcon
									className='fa-2x text-success'
									icon={faFolderOpen}
								/>
								<FontAwesomeIcon
									className='fa-1x'
									icon={faEllipsisVertical}
								/>
							</div>
							<div className='mt-auto'>
								<h6 className='folderName'>Personal Data</h6>
								<div className='folderDetails d-flex justify-content-between align-items-center'>
									<div className='noOfFiles'>200 Files</div>
									<div className='size'>100 MB</div>
								</div>
							</div>
						</div>
					</div>
					<div className='col '>
						<div className='bg-white folderBox'>
							<div className='d-flex align-items-center justify-content-between'>
								<FontAwesomeIcon
									className='fa-2x text-danger'
									icon={faFolderOpen}
								/>
								<FontAwesomeIcon
									className='fa-1x'
									icon={faEllipsisVertical}
								/>
							</div>
							<div className='mt-auto'>
								<h6 className='folderName'>Personal Data</h6>
								<div className='folderDetails d-flex justify-content-between align-items-center'>
									<div className='noOfFiles'>200 Files</div>
									<div className='size'>100 MB</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
