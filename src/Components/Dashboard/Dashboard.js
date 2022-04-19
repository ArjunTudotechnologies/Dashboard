import React from "react";
import DashScreen from "./DashScreen/DashScreen";
import SideMenu from "./SideMenu/SideMenu";

export default function Dashboard() {
	return (
		<div
			className='d-flex'
			style={{
				minHeight: "100vh",
				maxHeight: "max-content",
				height: "auto",
			}}>
			<div className='col-sm-3 d-none d-sm-block   position-relative'>
				<SideMenu />
			</div>
			<div className='col-sm-9 col-12  position-relative'>
				<DashScreen />
			</div>
		</div>
	);
}
