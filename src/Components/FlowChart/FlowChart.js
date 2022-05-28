import { useCallback, useState } from "react";
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
let nodeId = 1;
function FlowChart() {
	const reactFlowInstance = useReactFlow();

	const [nodes, setNodes] = useState(initialNodes);
	const [edges, setEdges] = useState(initialEdges);
	const NodeType = (types) => {
		console.log(types);
		if (types === "approval") {
			return (
				<>
					<h5>approval</h5>
					<span className='d-flex flex-column'>
						<label htmlFor='selectuserforApproval'>
							Select users
						</label>
						<input
							id='selectuserforApproval'
							type='text'
							placeholder='select users'
						/>
					</span>
				</>
			);
		} else if (types === "view") {
			return (
				<>
					<h5>View</h5>
					<span className='d-flex flex-column'>
						<label htmlFor='selectuserforView'>Select users</label>
						<input
							id='selectuserforView'
							type='text'
							placeholder='select users'
						/>
					</span>
				</>
			);
		} else if (types === "sign") {
			return (
				<>
					<h5>sign</h5>
					<span className='d-flex flex-column'>
						<label htmlFor='selectuserforSign'>Select users</label>
						<input
							id='selectuserforSign'
							type='text'
							placeholder='select users'
						/>
					</span>
				</>
			);
		}
	};
	const drop = (event) => {
		event.preventDefault();
		var data = event.dataTransfer.getData("Text");
		const id = `${++nodeId}`;
		const lastNode = nodes[nodes.length - 1];
		let position = {
			x: lastNode.position.x,
			y: lastNode.position.y + 80,
		};
		const newNode = {
			id,
			position,
			data: {
				label: NodeType(data),
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
					Approval
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
