import Multiselect from "multiselect-react-dropdown";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function NewNodes({
	types,
	taskId,
	UpdateToUserlist,
	userEmail,
	selected,
	completionDate,
	updateCompletionDate,
}) {
	const [completionDateTime, setCompletionDateTime] = React.useState(
		new Date()
	);
	let comp = null;
	console.log("====================================");
	console.log(completionDate);
	console.log("====================================");
	const selectDate = (date) => {
		setCompletionDateTime(date);
		updateCompletionDate(date, taskId - 1);
	};
	const UsersList = () => {
		console.log(taskId, "rendering");
		return (
			<div className='d-flex flex-column'>
				<div>
					{/* <label htmlFor=''>Completion time</label> */}
					<div className=''>
						<label htmlFor='' className=''>
							Completion date
						</label>
						<DatePicker
							className='mt-2'
							closeOnScroll={true}
							selected={
								completionDate
									? new Date(completionDate)
									: completionDateTime
							}
							onChange={(date) => selectDate(date)}
						/>
					</div>
				</div>
				<div>
					<label htmlFor=''>Users</label>
					<Multiselect
						className='col my-2 select '
						options={userEmail} // Options to display in the dropdown
						selectedValues={selected} // Preselected value to persist in dropdown
						onSelect={(selectedList, selectedItem) => {
							UpdateToUserlist(
								selectedList,
								selectedItem,
								taskId - 1
							);
						}} // Function will trigger on select event
						onRemove={(selectedList, removedItem) =>
							UpdateToUserlist(
								selectedList,
								removedItem,
								taskId - 1
							)
						} // Function will trigger on remove event
						displayValue='email' // Property name to display in the dropdown options
					/>
				</div>
			</div>
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
