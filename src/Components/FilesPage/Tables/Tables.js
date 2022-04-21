import {
	faAngleDown,
	faDownload,
	faEllipsisVertical,
	faEye,
	faListDots,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UilPlus } from "@iconscout/react-unicons";
import React from "react";
import "./Tables.css";
// import "./Files.css";
// import useWrapperHeight from "../../../../CustomHooks/useWrapperHeight";

export default function Tables() {
	const listData = [
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
		const hearder = document.querySelector(".FilesPage .header");
		// const folders = document.querySelector(".folders");
		const computedHeight = parent.clientHeight - hearder.clientHeight;
		const target = document.querySelector(".FilesPage .files");
		target.style.height = computedHeight + "px";
		ListWrapperHeight();
		// setHeightLoading(false);
	};
	React.useEffect(() => {
		dynamicHeight();
		// setHeightLoading(false);
	}, []);
	return (
		<div className='files '>
			<div className='secHeader mb-3'>
				<div className='secTitle'>Files</div>
				<div className='filter '>
					<span className='me-3'>View All</span>
					<span className='me-3'>Sort by</span>
					<FontAwesomeIcon icon={faAngleDown} />
					<span
						style={{ cursor: "pointer" }}
						// onClick={Handlelogin}
						className=' ms-3 btn btn-info text-white '>
						<span className="me-2">Add file</span>
						<UilPlus size='16' color='#fff' />
					</span>
				</div>
			</div>
			<div className='listWrapper '>
				<div className='d-flex tableHead pb-2'>
					<div className='col-4 '>File name</div>
					<div className='col-3 '>Folder name</div>
					{/* <div className='col-2 '>File size</div> */}
					<div className='col-3 '>Last viewed</div>
					<div className='col-2 '>Actions</div>
					{/* <div className='col-2 '>d</div> */}
				</div>
				<div className='listItems'>
					{heightLoading
						? ""
						: [...listData, ...listData, ...listData].map(
								(item, ind) => (
									<div className='d-flex flex-wrap tableItems'>
										<div className='col-4 d-flex align-items-center '>
											<span className='me-3'>
												<img
													style={{ width: "20px" }}
													src={item.fileImg}
													alt=''
													className='img-fluid'
												/>
											</span>{" "}
											<span>{item.fileName}</span>
										</div>
										<div
											className='col-3 foldername d-flex align-items-center '
											style={{ color: item.folderColor }}>
											{item.folderName}
										</div>
										{/* <div className='col-2 filesize'>
											128KB
										</div> */}
										<div className='col-3 lastview d-flex align-items-center '>
											{item.lastViewed}
										</div>
										<div className='col-2   d-flex align-items-center'>
											<div className='d-flex align-items-center w-100'>
												<span
													className='col actionText '
													style={{
														cursor: "pointer",
													}}>
													<FontAwesomeIcon
														icon={faEye}
													/>
												</span>
												{/* <span>|</span> */}
												<span
													className='col px-3 border-2 border-start text-center border-end actionText'
													style={{
														cursor: "pointer",
													}}>
													<FontAwesomeIcon
														icon={faDownload}
													/>
												</span>
												{/* <span>|</span> */}
												<span
													className='col text-center'
													style={{
														cursor: "pointer",
													}}>
													<FontAwesomeIcon
														className='fa-1x'
														icon={
															faEllipsisVertical
														}
													/>
												</span>
											</div>
										</div>
										{/* <div className='col-2 '>d</div> */}
									</div>
								)
						  )}
				</div>
			</div>
		</div>
	);
}
