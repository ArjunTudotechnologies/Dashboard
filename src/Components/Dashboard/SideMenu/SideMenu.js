import {
	faAngleRight,
	faHandshake,
	faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	UilEstate,
	UilUser,
	UilBill,
	UilShieldPlus,
	UilFile,
	UilInvoice,
	UilAt,
	UilFileContract,
	UilSignOutAlt,
} from "@iconscout/react-unicons";
import React from "react";
import "./SideMenu.css";
import UilUsersAlt from "../../../../node_modules/@iconscout/react-unicons/icons/uil-users-alt";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SideMenu({ url }) {
	// const location = React.useLocation();
	const history = useHistory();
	const dropBtn = React.useRef(null);
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
				// item.style.height = "0px";
			}
		});
		// target.style.height = "max-content";
		target.classList.toggle("active");
	};
	return (
		<div className='sidemenu h-100'>
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
					<Link to={`${url}/employeefiles`}>
						<div className='mainMenuItem' onClick={(e) => hide(e)}>
							<UilUser size='16' color='#000' />
							<span className='ms-2 me-4 d-inline-block'>
								Employee Files
							</span>
							<FontAwesomeIcon icon={faAngleRight} />
						</div>
						<div className='submenu mt-2'>
							<div className='mt-2 d-flex align-items-start'>
								<div style={{ height: "20px" }}>
									<UilUser size='16' color='#000' />
								</div>
								<div className='ms-2'>
									<span className=''>Personal Details</span>
								</div>
							</div>
							<div className='mt-2 d-flex align-items-start'>
								<div style={{ height: "20px" }}>
									<UilShieldPlus size='16' color='#000' />
								</div>
								<div className='ms-2'>
									<span className=''>Insurance Claims</span>
								</div>
							</div>
							<div className='mt-2 d-flex align-items-start'>
								<div style={{ height: "20px" }}>
									<UilBill size='16' color='#000' />
								</div>
								<div className='ms-2'>
									Miscellaneous Expenses
								</div>
							</div>
						</div>
					</Link>
				</div>
				<div className=' item'>
					<Link to={`${url}/clientfiles`}>
						<div className='mainMenuItem' onClick={(e) => hide(e)}>
							<UilUsersAlt size='16' color='#000' />
							<span className='ms-2 me-4 d-inline-block'>
								Client Files
							</span>
							<FontAwesomeIcon icon={faAngleRight} />
						</div>
						<div className='submenu mt-2'>
							<div className='mt-2'>
								<UilAt size='16' color='#000' />
								<span className='ms-2'>Contact Details</span>
							</div>
							<div className='mt-2'>
								<UilFileContract size='16' color='#000' />
								<span className='ms-2'>Agreements</span>
							</div>
							<div className='mt-2'>
								<UilInvoice size='16' color='#000' />
								<span className='ms-2'>Invoices</span>
							</div>
							<div className='mt-2'>
								<UilFile size='16' color='#000' />
								<span className='ms-2'>Transit files</span>
							</div>
						</div>
					</Link>
				</div>
				<div className=' item'>
					<div className='d-flex align-items-center' onClick={logout}>
						{/* UilSignOutAlt */}
						<UilSignOutAlt size='16' color='#000' />
						<span className='ms-2'>Logout</span>
					</div>
				</div>
			</div>
		</div>
	);
}
