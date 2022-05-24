import {
	faCircle,
	faFolderPlus,
	faPlus,
	faPlusCircle,
	faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Multiselect from "multiselect-react-dropdown";
import React, { createElement, useRef } from "react";
import {
	NormalInputs,
	SelectInputs,
} from "../../ModularComponents/Inputs/Inputs";
import "./NewActivity.css";

export default function NewActivity(props) {
	const [userEmail, setUserEmail] = React.useState([]);
	const [task, setTask] = React.useState([]);
	const { tasksList, setTasklist, setworkFlowName } = props;
	// const [tasksList, setTasklist] = React.useState([
	// 	{ userList: [], action: [] },
	// ]);
	const action = [
		{
			name: "Approve",
		},
		{
			name: "Sign",
		},
		{
			name: "View",
		},
	];
	const [count, setCount] = React.useState(1);
	const selectRef = useRef();
	const getUserEmail = () => {
		const emails = [];
		props.data.forEach((item, ind) => {
			emails.push({ email: item.data.email, uid: item.data.uid });
		});
		console.log(emails);
		setUserEmail(emails);
	};
	const selected = () => {
		console.log(selectRef.current.getSelectedItems());
	};
	const appendTask = (e) => {
		setTasklist((prev) => [
			...prev,
			{
				taskName: `Task ${tasksList.length + 1}`,
				userList: [],
				action: [],
			},
		]);
	};
	const UpdateToUserlist = (selectedList, selectedItem, id) => {
		console.log(selectedList, selectedItem);
		setTasklist((prev) => {
			const taskList = [...prev];
			taskList[id].userList = selectedList;
			return taskList;
		});
	};
	const updateToAction = (selectedList, selectedItem, id) => {
		console.log(selectedList, selectedItem, id);
		setTasklist((prev) => {
			const taskList = [...prev];
			taskList[id].action = selectedList;
			return taskList;
		});
	};

	const TaskComp = ({ taskId, taskName }) => {
		const lastInd = tasksList.length;
		// console.log(lastInd, taskId);
		return (
			<div className='border-start position-relative px-4 pb-4 '>
				<span
					className='position-absolute d-flex align-items-center'
					style={{ top: "0%", left: "-1.5%" }}>
					<FontAwesomeIcon
						// onClick={appendTask}
						icon={faCircle}
						className='fa-1x me-2 text-secondary'
					/>
					{/* <span>Add New Task</span> */}
				</span>
				<span onClick={selected}>{taskName}</span>

				<div className='selector d-flex flex-column  px-3 py-2  w-100'>
					<span className='mt-2 mb-1'>Task type</span>
					<Multiselect
						className='col select w-50'
						singleSelect
						// ref={selectRef}
						options={action} // Options to display in the dropdown
						selectedValues={tasksList[taskId].action} // Preselected value to persist in dropdown
						onSelect={(selectedList, selectedItem) =>
							updateToAction(selectedList, selectedItem, taskId)
						} // Function will trigger on select event
						onRemove={(selectedList, selectedItem) =>
							updateToAction(selectedList, selectedItem, taskId)
						} // Function will trigger on remove event
						displayValue='name' // Property name to display in the dropdown options
					/>
					<span className='mt-2 mb-1'>Add people</span>
					<Multiselect
						className='col my-2 select '
						ref={selectRef}
						options={userEmail} // Options to display in the dropdown
						selectedValues={tasksList[taskId].userList} // Preselected value to persist in dropdown
						onSelect={(selectedList, selectedItem) =>
							UpdateToUserlist(selectedList, selectedItem, taskId)
						} // Function will trigger on select event
						onRemove={(selectedList, removedItem) =>
							UpdateToUserlist(selectedList, removedItem, taskId)
						} // Function will trigger on remove event
						displayValue='email' // Property name to display in the dropdown options
					/>

					{lastInd - 1 == taskId && (
						<span
							onClick={appendTask}
							className='position-absolute d-flex align-items-center addNewTask'
							style={{
								bottom: "-10%",
								left: "-2.5%",
							}}>
							<FontAwesomeIcon
								icon={faPlusCircle}
								className='fa-2x me-2 text-secondary'
							/>
							<span className='fw-bold '>Add New Task</span>
						</span>
					)}
				</div>
			</div>
		);
	};
	React.useEffect(() => {
		getUserEmail();
	}, []);
	const handleNameChange = (e) => {
		// console.log(e.target.value);
		setworkFlowName(e.target.value);
	};
	return (
		<div className='taskWrapper'>
			<div className='d-flex align-items-center justify-content-between'>
				<div className='mb-3 w-100'>
					<NormalInputs
						type='text'
						placeholder='Task name'
						label='Create Workflow'
						onBlur={handleNameChange}
					/>
				</div>
				{/* <FontAwesomeIcon
					onClick={appendTask}
					icon={faPlusCircle}
					className='fa-3x mt-4'
				/> */}
			</div>

			{tasksList.map((item, ind) => {
				return <TaskComp taskId={ind} taskName={item.taskName} />;
			})}
		</div>
	);
}
