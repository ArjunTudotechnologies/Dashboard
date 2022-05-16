import Multiselect from "multiselect-react-dropdown";
import React, { useRef } from "react";
import {
	NormalInputs,
	SelectInputs,
} from "../../ModularComponents/Inputs/Inputs";

export default function NewActivity(props) {
	const [userEmail, setUserEmail] = React.useState([]);
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
	React.useEffect(() => {
		getUserEmail();
	}, []);
	return (
		<div>
			<fieldset>
				<legend onClick={selected}>References</legend>
				<div>
					<Multiselect
						ref={selectRef}
						options={userEmail} // Options to display in the dropdown
						// selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
						// onSelect={this.onSelect} // Function will trigger on select event
						// onRemove={this.onRemove} // Function will trigger on remove event
						displayValue='email' // Property name to display in the dropdown options
					/>
				</div>
			</fieldset>
		</div>
	);
}
