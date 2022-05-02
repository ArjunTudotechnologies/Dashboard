import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Components/Dashboard/Dashboard.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import FilesPage from "./Components/FilesPage/FilesPage";
import Pdfview from "./Components/Pdfview/Pdfview";
function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<Login />
					{/* <Link to='dashboard'>
						<div className='btn btn-success'>send</div>
					</Link> */}
				</Route>
				<Route path='/dashboard'>
					<Dashboard />
				</Route>
				<Route exact path='/pdfview'>
					<Pdfview />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
