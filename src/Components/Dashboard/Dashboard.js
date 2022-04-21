import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import FilesPage from "../FilesPage/FilesPage";
import "./Dashboard.css";
import DashScreen from "./DashScreen/DashScreen";
import SideMenu from "./SideMenu/SideMenu";

export default function Dashboard() {
	let { path, url } = useRouteMatch();
	return (
		<div
			className='d-flex dashboard'
			style={{
				height: "100vh",
			}}>
			<div className='sidebarWrapper col-sm-3  d-sm-block   position-relative'>
				<SideMenu url={url} />
			</div>
			<div className='col-sm-9 col-12  position-relative'>
				<Switch>
					<Route exact path={`${path}/`}>
						<DashScreen />
					</Route>
					<Route exact path={`${path}/employeefiles`}>
						<FilesPage />
					</Route>
					<Route exact path={`${path}/clientfiles`}>
						<FilesPage />
					</Route>
				</Switch>
			</div>
		</div>
	);
}
