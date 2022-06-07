import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Adduser from "../Adduser/Adduser";
import FilesPage from "../FilesPage/FilesPage";
import FlowChart from "../FlowChart/FlowChart";
import FlowChartComp from "../FlowChart/FlowChartComp/FlowChartComp";
import Pdfview from "../Pdfview/Pdfview";
import TemplateDOC from "../TemplateDOC/TemplateDOC";
import Users from "../Users/Users";
import "./Dashboard.css";
import DashScreen from "./DashScreen/DashScreen";
import SideMenu from "./SideMenu/SideMenu";
import Workflow from "./Workflow/Workflow";

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
						<DashScreen url={url} />
					</Route>
					<Route exact path={`${path}/flowchart`}>
						<FlowChart />
					</Route>
					<Route exact path={`${path}/template`}>
						<TemplateDOC />
					</Route>
					<Route exact path={`${path}/:parent/:folder/:folderid`}>
						<FilesPage />
					</Route>
					<Route exact path={`${path}/Workflow/:fileid`}>
						<Workflow />
					</Route>
					<Route exact path={`${path}/viewpdf`}>
						<Pdfview />
					</Route>
					<Route exact path={`${path}/adduser`}>
						<Adduser />
					</Route>
					<Route exact path={`${path}/users`}>
						<Users />
					</Route>
				</Switch>
			</div>
		</div>
	);
}
