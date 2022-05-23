import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import NewActivity from "./NewActivity/NewActivity";

export default function ActivityMapperModal(props) {
	const [users, setUsers] = React.useState([]);
	const [tasksList, setTasklist] = React.useState(null);
	const [workFlowName, setworkFlowName] = React.useState(null);
	const getUsers = () => {
		axios
			.get("https://calm-beyond-84616.herokuapp.com/Users")
			.then((res) => setUsers(res.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getUsers();
		setTasklist([{ taskName: "Task 1", userList: [], action: [] }]);
	}, []);
	const handleTaskFlow = () => {
		// console.log(tasksList, );

		const data = {
			workFlowName: workFlowName,
			fileId: props.fileId,
			taskList: tasksList,
		};
		console.log(data);
		axios
			.post("https://calm-beyond-84616.herokuapp.com/workFlows", data)
			.then((res) => {
				console.log(res.data);
				props.Callbacks();
			})
			.catch((err) => console.log(err));
	};
	return (
		<div>
			<Modal
				centered
				// show={true}
				show={props.show}
				fullscreen={"md-down"}
				onHide={() => props.Callbacks()}>
				<Modal.Header closeButton>
					<Modal.Title>Task Flow</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<NewActivity
						data={users}
						tasksList={tasksList}
						setTasklist={setTasklist}
						setworkFlowName={setworkFlowName}
					/>
				</Modal.Body>
				<Modal.Footer>
					<button
						onClick={handleTaskFlow}
						className='btn btn-success'>
						Save
					</button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
