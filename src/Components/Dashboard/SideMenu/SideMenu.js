import {
	faAngleRight,
	faHandshake,
	faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UilEstate, UilUser } from "@iconscout/react-unicons";
import React from "react";
import "./SideMenu.css";
import UilUsersAlt from "../../../../node_modules/@iconscout/react-unicons/icons/uil-users-alt";

export default function SideMenu() {
	const hide = () => {
		const item = document.querySelector(".submenu");
		item.classList.toggle("active");
	};
	return (
		<div className='sidemenu'>
			<div className='menuItemWrapper'>
				<div className='home item'>
					<div className='mainMenuItem'>
						<UilEstate size='16' color='#000' />
						<span className='ms-2'>Home</span>
					</div>
				</div>
				<div className='home item'>
					<div className='mainMenuItem' onClick={hide}>
						<UilUser size='16' color='#000' />
						<span className='ms-2 me-4'>Employee Files</span>
						<FontAwesomeIcon icon={faAngleRight} />
					</div>
					<div className='submenu '>
						<div className='mt-2'>
							<UilUser size='16' color='#000' />
							<span className='ms-2'>Employee Files</span>
						</div>
						<div className='mt-2'>
							<UilUsersAlt size='16' color='#000' />
							<span className='ms-2'>Client Files</span>
						</div>
					</div>
				</div>
				<div className='home item'>
					<div className='mainMenuItem'>
						<UilUsersAlt size='16' color='#000' />
						<span className='ms-2'>Client Files</span>
					</div>
				</div>
			</div>
		</div>
	);
}
