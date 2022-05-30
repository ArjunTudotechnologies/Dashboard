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
let nodeId = 0;
function FlowChart() {
	const reactFlowInstance = useReactFlow();

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
	const UpdateToUserlist = (selectedList, selectedItem, id) => {
		console.log(selectedList, selectedItem, tasksList);
		setTasklist((prev) => {
			const taskList = [...prev];
			taskList[id].userList = selectedList;
			return taskList;
		});
	};
	const UsersList = (taskId) => {
		console.log(taskId);
		return (
			<span className='d-flex flex-column'>
				<label htmlFor=''>Users</label>
				<Multiselect
					className='col my-2 select '
					options={userEmail} // Options to display in the dropdown
					// selectedValues={tasksList[taskId].userList} // Preselected value to persist in dropdown
					onSelect={(selectedList, selectedItem) => {
						UpdateToUserlist(selectedList, selectedItem, taskId);
					}} // Function will trigger on select event
					onRemove={(selectedList, removedItem) =>
						UpdateToUserlist(selectedList, removedItem, taskId)
					} // Function will trigger on remove event
					displayValue='email' // Property name to display in the dropdown options
				/>
			</span>
		);
	};
	React.useEffect(() => {
		getUsers();
	}, []);
	const NodeType = (types, taskId) => {
		console.log(types, taskId);
		if (types === "approval") {
			return (
				<>
					<h5>Approval</h5>
					{UsersList(taskId)}
				</>
			);
		} else if (types === "view") {
			return (
				<>
					<h5>View</h5>
					{UsersList(taskId)}
				</>
			);
		} else if (types === "sign") {
			return (
				<>
					<h5>sign</h5>
					{UsersList(taskId)}
				</>
			);
		}
	};
	const drop = (event) => {
		event.preventDefault();
		var data = event.dataTransfer.getData("Text");
		const id = nodeId;
		console.log(id);
		nodeId += 1;
		setTasklist((prev) => {
			const newData = [
				...prev,
				{
					CompletionDate: new Date(),
					taskName: `Task ${id}`,
					userList: [],
					action: [],
				},
			];
			console.log(newData);
			return newData;
		});
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
				label: NodeType(data, id),
			},
		};

		setNodes((prev) => [...prev, newNode]);
	};

	const onNodesChange = (changes) => {
		setNodes((nds) => {
			console.log(nds);
			return applyNodeChanges(changes, nds);
		});
	};
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
			</div>
			<ReactFlow
				// onClick={onClick}
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

// export default FlowChart;
export default function () {
	return (
		<ReactFlowProvider>
			<FlowChart />
		</ReactFlowProvider>
	);
}
