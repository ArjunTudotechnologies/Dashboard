import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import NewActivity from "./NewActivity/NewActivity";
import "./ActivityMapperModal.css";

export default function ActivityMapperModal(props) {
	const [users, setUsers] = React.useState([]);
	const [tasksList, setTasklist] = React.useState(null);
	const [workFlowName, setworkFlowName] = React.useState("");
	const getUsers = () => {
		axios
			.get("https://calm-beyond-84616.herokuapp.com/Users")
			.then((res) => setUsers(res.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getUsers();
		setTasklist([
			{
				CompletionDate: new Date(),
				taskName: "Task 1",
				userList: [],
				action: [],
			},
		]);
		if (props.prevData != undefined) {
			console.log(props.prevData.data.taskList);
			setworkFlowName(props.prevData.data.workFlowName);
			setTasklist(props.prevData.data.taskList);
		} else
			setTasklist([
				{
					CompletionDate: new Date(),
					taskName: "Task 1",
					userList: [],
					action: [],
				},
			]);
	}, [props.prevData, props.show]);
	const handleTaskFlow = () => {
		// console.log(tasksList, );
		console.log(props);
		const data = {
			workFlowName: workFlowName,
			fileId: props.fileId,
			taskList: tasksList,
		};
		console.log(data);
		if (props.prevData != undefined) {
			data.workflowId = props.prevData.id;
		}
		axios
			.post("https://calm-beyond-84616.herokuapp.com/workFlows", data)
			.then((res) => {
				console.log(res.data);
				setworkFlowName(null);
				setTasklist([
					{
						CompletionDate: new Date(),
						taskName: "Task 1",
						userList: [],
						action: [],
					},
				]);
				// setworkFlowName("");
				props.Callbacks();
			})
			.catch((err) => console.log(err));
	};
	const handleClose = () => {
		setUsers([]);
		if (props.prevData === undefined) {
			setTasklist([
				{
					CompletionDate: new Date(),
					taskName: "Task 1",
					userList: [],
					action: [],
				},
			]);
			setworkFlowName(null);
		}
		props.Callbacks();
	};
	return (
		<div>
			<Modal
				centered
				// show={true}
				show={props.show}
				fullscreen={"md-down"}
				onHide={() => props.Callbacks()}>
				<Modal.Header className='border-0 d-flex justify-content-between align-items-center'>
					<Modal.Title>Create Workflow</Modal.Title>
					<span
						onClick={handleClose}
						className='fs-3'
						style={{ cursor: "pointer" }}>
						&times;
					</span>
				</Modal.Header>
				<Modal.Body className='workflowModal'>
					<NewActivity
						data={users}
						tasksList={tasksList}
						setTasklist={setTasklist}
						setworkFlowName={setworkFlowName}
						workFlowName={workFlowName}
					/>
				</Modal.Body>
				<Modal.Footer className='border-0 d-flex justify-content-center'>
					<button onClick={handleTaskFlow} className='btn btn-dark'>
						Save
					</button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
