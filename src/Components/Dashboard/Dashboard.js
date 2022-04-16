import React from "react";
import DashScreen from "./DashScreen/DashScreen";
import SideMenu from "./SideMenu/SideMenu";

export default function Dashboard() {
	return (
		<div className='d-flex vh-100'>
			<div className='col-2  position-relative'>
				<SideMenu />
			</div>
			<div className='col-10 position-relative'>
				<DashScreen />
			</div>
		</div>
	);
}
