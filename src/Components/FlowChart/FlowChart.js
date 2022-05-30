import React, { useCallback, useState } from "react";
import ReactFlow, {
	Controls,
	Background,
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	ReactFlowProvider,
	useReactFlow,
} from "react-flow-renderer";

import initialNodes from "./initialNodes";
import initialEdges from "./initialEdges";
import "./FlowChart.css";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import NewNodes from "./NewNodes/NewNodes";
let nodeId = 0;
function FlowChart() {
	// const reactFlowInstance = useReactFlow();

	const [nodes, setNodes] = useState(initialNodes);
	const [edges, setEdges] = useState(initialEdges);
	const [users, setUsers] = React.useState([]);
	const [userEmail, setUserEmail] = React.useState([]);
	const [tasksList, setTasklist] = React.useState([]);

	const getUsers = () => {
		axios
			.get("https://calm-beyond-84616.herokuapp.com/Users")
			.then((res) => {
				setUsers(res.data);
				getUserEmail(res.data);
			})
			.catch((err) => console.log(err));
	};
	const getUserEmail = (user) => {
		const emails = [];
		user.forEach((item, ind) => {
			emails.push({ email: item.data.email, uid: item.data.uid });
		});
		console.log(emails);
		setUserEmail(emails);
	};
	React.useEffect(() => {
		getUsers();
	}, []);
	const UpdateToUserlist = (selectedList, selectedItem, id) => {
		console.log(selectedList, selectedItem, id, tasksList);
		setTasklist((prev) => {
			const taskList = [...prev];
			taskList[id].userList = selectedList;
			return taskList;
		});
	};

	const drop = (event) => {
		event.preventDefault();
		var type = event.dataTransfer.getData("Text");
		const id = `${++nodeId}`;
		console.log(id);
		// nodeId += 1;

		let position = {};
		if (nodes.length) {
			const lastNode = nodes[nodes.length - 1];
			position = {
				x: lastNode.position.x,
				y: lastNode.position.y + 80,
			};
		} else {
			position = {
				x: 0,
				y: 0,
			};
		}

		const newNode = {
			id,
			position,
			data: {
				label: (
					<NewNodes
						UpdateToUserlist={UpdateToUserlist}
						userEmail={userEmail}
						types={type}
						taskId={id}
					/>
				),
			},
		};
		const newTask = {
			CompletionDate: new Date(),
			taskName: `Task ${id}`,
			userList: [],
			action: type,
		};

		updateNewTask(newTask);
		setNodes((prev) => [...prev, newNode]);
	};

	const updateNewTask = useCallback(
		(newTask) => {
			setTasklist((prev) => [...prev, newTask]);
		},
		[setTasklist]
	);

	const onNodesChange = useCallback(
		(changes) => {
			setNodes((nds) => applyNodeChanges(changes, nds));
		},
		[setNodes]
	);
	const onEdgesChange = useCallback(
		(changes) => {
			setEdges((eds) => applyEdgeChanges(changes, eds));
		},
		[setEdges]
	);
	const onConnect = useCallback(
		(connection) => setEdges((eds) => addEdge(connection, eds)),
		[setEdges]
	);
	function allowDrop(event) {
		event.preventDefault();
	}
	const DragStart = (event) => {
		console.log(event.target.getAttribute("name"));
		event.dataTransfer.setData("Text", event.target.getAttribute("name"));
	};
	const showJson = () => {
		const data = {
			tasksList,
			nodes,
			edges,
		};
		const val = JSON.stringify(data, null, 2);
		var x = window.open();
		x.document.open();
		x.document.write("<html><body><pre>" + val + "</pre></body></html>");
		x.document.close();
	};

	const defaultEdgeOptions = { animated: false };
	return (
		<span className='flow'>
			<div className=''>
				<span
					onDragStart={DragStart}
					name='approval'
					className='p-2 border me-2'
					draggable='true'>
					Approvals
				</span>
				<span
					onDragStart={DragStart}
					name='view'
					className='p-2 border me-2 '
					draggable='true'>
					VIew
				</span>
				<span
					onDragStart={DragStart}
					name='sign'
					className='p-2 border me-2'
					draggable='true'>
					Sign
				</span>
				<button className='btn btn-success' onClick={() => showJson()}>
					Click
				</button>
			</div>
			<ReactFlow
				onDrop={drop}
				onDragOver={allowDrop}
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				defaultEdgeOptions={defaultEdgeOptions}
				fitView>
				<Controls />
				<Background />
			</ReactFlow>
		</span>
	);
}

export default function () {
	return (
		<ReactFlowProvider>
			<FlowChart />
		</ReactFlowProvider>
	);
}
