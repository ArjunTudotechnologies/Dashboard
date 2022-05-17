import {
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
	const [tasksList, setTasklist] = React.useState([
		{ userList: [], action: [] },
	]);
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
			emails.push({ email: item.data.email });
		});
		console.log(emails);
		setUserEmail(emails);
	};
	const selected = () => {
		console.log(selectRef.current.getSelectedItems());
	};
	const appendTask = () => {
		setTasklist((prev) => [...prev, { userList: [], action: [] }]);
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

	const TaskComp = ({ taskId }) => {
		return (
			<fieldset>
				<legend onClick={selected}>Task Flow {taskId + 1}</legend>

				<div className='selector d-flex justify-content-between border p-4 align-items-center w-100'>
					<Multiselect
						// style={{ width: "100%" }}
						className='col'
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
					<Multiselect
						className='col'
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
					{/* <FontAwesomeIcon
						onClick={appendTask}
						icon={faPlusCircle}
						className='fa-3x'
					/> */}
				</div>
			</fieldset>
		);
	};
	React.useEffect(() => {
		getUserEmail();
	}, []);
	return (
		<div className='taskWrapper'>
			<div className='d-flex align-items-center justify-content-between'>
				<div className='pe-3 w-100'>
					<NormalInputs
						type='text'
						placeholder='Task name'
						label='Task name'
					/>
				</div>
				<FontAwesomeIcon
					onClick={appendTask}
					icon={faPlusCircle}
					className='fa-3x mt-4'
				/>
			</div>

			{tasksList.map((item, ind) => {
				return <TaskComp taskId={ind} />;
			})}
			{/* {[...Array(count)].map((item, ind) => (
				<TaskComp key={ind} />
			))} */}
		</div>
	);
}
