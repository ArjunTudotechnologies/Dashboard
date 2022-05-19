import React, { useState, useEffect } from "react";
import {
	faAngleRight,
	faHandshake,
	faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	UilEstate,
	UilUser,
	UilUserPlus,
	UilUserCheck,
	UilSignOutAlt,
	UilTimes,
} from "@iconscout/react-unicons";
import "./SideMenu.css";
import UilUsersAlt from "../../../../node_modules/@iconscout/react-unicons/icons/uil-users-alt";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
export default function SideMenu({ url }) {
	// const location = React.useLocation();
	const history = useHistory();
	const dropBtn = React.useRef(null);
	const [employeefiles, setEmployeefiles] = useState([]);
	const [clientfiles, setclientfiles] = useState([]);
	const logout = () => {
		history.push("/");
	};
	const hide = (e) => {
		console.log(e);
		const target = e.currentTarget.nextElementSibling;
		const items = document.querySelectorAll(".submenu");
		items.forEach((item, ind) => {
			if (item !== target && item.classList.contains("active")) {
				item.classList.remove("active");
			}
		});
		target.classList.toggle("active");
	};
	const sideBarOpen = () => {
		const sidebar = document.querySelector(".sidebarWrapper");
		const SideMenu = document.querySelector(".sidemenu");
		sidebar.classList.toggle("open");
		SideMenu.classList.toggle("d-none");
	};
	const Client = () => {
		const userId = localStorage.getItem("userId");
		axios
			.get(
				`https://calm-beyond-84616.herokuapp.com/getUserFolder?userId=${userId}&parent=Client Files`
			)
			.then((res) => {
				// console.log(res.data);
				setclientfiles(res.data);
				// dispatch(setLoading(false));
			})

			.catch((err) => console.log(err));
	};
	const Employee = () => {
		const userId = localStorage.getItem("userId");
		axios
			.get(
				`https://calm-beyond-84616.herokuapp.com/getUserFolder?userId=${userId}&parent=Employee Files`
			)
			.then((res) => {
				// console.log(res.data);
				setEmployeefiles(res.data);
				// dispatch(setLoading(false));
			})

			.catch((err) => console.log(err));
	};
	useEffect(() => {
		Client();
		Employee();
	}, []);

	return (
		<div className='sidemenu d-none d-sm-block h-100 position-relative'>
			<span
				className='position-absolute d-sm-none d-block'
				onClick={sideBarOpen}
				style={{ top: "1.5rem", right: "2rem", cursor: "pointer" }}>
				<UilTimes size='16' color='#000' />
			</span>
			<div
				className='mb-3'
				style={{ width: "100%", textAlign: "center" }}>
				<img
					src='/assets/images/logo.png'
					class='img-fluid'
					alt=''
					srcset=''
					style={{ width: "25%" }}
				/>
			</div>
			<div className='menuItemWrapper w-100'>
				<div className=' item'>
					<Link to={`${url}`}>
						<div className='mainMenuItem'>
							<UilEstate size='16' color='#000' />
							<span className='ms-2'>Home</span>
						</div>
					</Link>
				</div>
				<div className=' item'>
					<div className='mainMenuItem' onClick={(e) => hide(e)}>
						<UilUser size='16' color='#000' />
						<span className='ms-2 me-4 d-inline-block'>
							Employee Files
						</span>
						<FontAwesomeIcon icon={faAngleRight} />
					</div>
					<div className='submenu mt-2'>
						{employeefiles.map((item, ind) => {
							return (
								<Link
									to={{
										pathname: `${url}/Employee Files/${item.data.name}/${item.docId}`,
									}}>
									<div className='mt-2 d-flex align-items-start'>
										<div style={{ height: "20px" }}>
											<UilUser size='16' color='#000' />
										</div>
										<div className='ms-2'>
											<span className=''>
												{item.data.name}
											</span>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
				<div className=' item'>
					<div className='mainMenuItem' onClick={(e) => hide(e)}>
						<UilUsersAlt size='16' color='#000' />
						<span className='ms-2 me-4 d-inline-block'>
							Client Files
						</span>
						<FontAwesomeIcon icon={faAngleRight} />
					</div>
					<div className='submenu mt-2'>
						{clientfiles.map((item, ind) => {
							// console.log(item.docId);
							return (
								<Link
									to={{
										pathname: `${url}/Client Files/${item.data.name}/${item.docId}`,
									}}>
									<div
										onClick={() =>
											localStorage.setItem(
												"currentColor",
												item.data.color
											)
										}
										className='mt-2 d-flex align-items-start'>
										<div style={{ height: "20px" }}>
											<UilUser size='16' color='#000' />
										</div>
										<div className='ms-2'>
											<span className=''>
												{item.data.name}
											</span>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
				{localStorage.getItem("isAdmin") === "true" && (
					<>
						{/* <div className=' item'>
							<Link to={`${url}/adduser`}>
								<div className='mainMenuItem'>
									<UilUserPlus size='16' color='#000' />
									<span className='ms-2'>Add User</span>
								</div>
							</Link>
						</div> */}
						<div className=' item'>
							<Link to={`${url}/users`}>
								<div className='mainMenuItem'>
									<UilUserCheck size='16' color='#000' />
									<span className='ms-2'>Users</span>
								</div>
							</Link>
						</div>
					</>
				)}
				<div className=' item'>
					<div className='d-flex align-items-center' onClick={logout}>
						<UilSignOutAlt size='16' color='#000' />
						<span className='ms-2'>Logout</span>
					</div>
				</div>
			</div>
		</div>
	);
}
