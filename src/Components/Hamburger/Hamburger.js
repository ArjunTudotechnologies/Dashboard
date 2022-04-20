import React from "react";
import SideMenu from "../Dashboard/SideMenu/SideMenu";

export default function Hamburger() {
	const sideBarOpen = () => {
		const sidebar = document.querySelector(".sidebarWrapper");
		const SideMenu = document.querySelector(".sidemenu");
		sidebar.classList.toggle("open");
		setTimeout(() => {
			SideMenu.classList.toggle("d-none");
		}, 700);
	};
	return (
		<span
			className='d-sm-none me-3'
			onClick={sideBarOpen}
			style={{ cursor: "pointer" }}>
			<svg
				width='25'
				height='20'
				viewBox='0 0 25 20'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M2.5 4H22.5C23.0304 4 23.5391 3.78929 23.9142 3.41421C24.2893 3.03914 24.5 2.53043 24.5 2C24.5 1.46957 24.2893 0.960859 23.9142 0.585786C23.5391 0.210714 23.0304 0 22.5 0H2.5C1.96957 0 1.46086 0.210714 1.08579 0.585786C0.710714 0.960859 0.5 1.46957 0.5 2C0.5 2.53043 0.710714 3.03914 1.08579 3.41421C1.46086 3.78929 1.96957 4 2.5 4ZM22.5 8H2.5C1.96957 8 1.46086 8.21071 1.08579 8.58579C0.710714 8.96086 0.5 9.46957 0.5 10C0.5 10.5304 0.710714 11.0391 1.08579 11.4142C1.46086 11.7893 1.96957 12 2.5 12H22.5C23.0304 12 23.5391 11.7893 23.9142 11.4142C24.2893 11.0391 24.5 10.5304 24.5 10C24.5 9.46957 24.2893 8.96086 23.9142 8.58579C23.5391 8.21071 23.0304 8 22.5 8ZM22.5 16H2.5C1.96957 16 1.46086 16.2107 1.08579 16.5858C0.710714 16.9609 0.5 17.4696 0.5 18C0.5 18.5304 0.710714 19.0391 1.08579 19.4142C1.46086 19.7893 1.96957 20 2.5 20H22.5C23.0304 20 23.5391 19.7893 23.9142 19.4142C24.2893 19.0391 24.5 18.5304 24.5 18C24.5 17.4696 24.2893 16.9609 23.9142 16.5858C23.5391 16.2107 23.0304 16 22.5 16Z'
					fill={"#d3d3d3"}
				/>
			</svg>
		</span>
	);
}
