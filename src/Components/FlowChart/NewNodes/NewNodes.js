import Multiselect from "multiselect-react-dropdown";
import React from "react";

export default function NewNodes({
	types,
	taskId,
	UpdateToUserlist,
	userEmail,
}) {
	console.log(types);
	let comp = null;
	const UsersList = () => {
		// console.log(taskId);
		return (
			<span className='d-flex flex-column'>
				<label htmlFor=''>Users</label>
				<Multiselect
					className='col my-2 select '
					options={userEmail} // Options to display in the dropdown
					// selectedValues={tasksList[taskId].userList} // Preselected value to persist in dropdown
					onSelect={(selectedList, selectedItem) => {
						UpdateToUserlist(
							selectedList,
							selectedItem,
							taskId - 1
						);
					}} // Function will trigger on select event
					onRemove={(selectedList, removedItem) =>
						UpdateToUserlist(selectedList, removedItem, taskId - 1)
					} // Function will trigger on remove event
					displayValue='email' // Property name to display in the dropdown options
				/>
			</span>
		);
	};

	if (types === "approval") {
		comp = (
			<>
				<h5>Approval</h5>
				<UsersList />
			</>
		);
	} else if (types === "view") {
		comp = (
			<>
				<h5>View</h5>
				<UsersList />
			</>
		);
	} else if (types === "sign") {
		comp = (
			<>
				<h5>sign</h5>
				<UsersList />
			</>
		);
	}

	return comp;
}
