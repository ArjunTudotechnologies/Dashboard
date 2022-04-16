import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import "./Search.css";
export default function Search(props) {
	return (
		<div
			className={`searchInput ` + props.className}
			style={{ width: props.width + "%" }}>
			<InputGroup style={{ width: "100%" }}>
				<InputGroup.Text id='searchBtn'>
					<FontAwesomeIcon icon={faSearch} />
				</InputGroup.Text>
				<FormControl
					style={{ padding: ".66rem" }}
					placeholder='Search'
					aria-label='Search'
					aria-describedby='basic-addon1'
				/>
			</InputGroup>
		</div>
	);
}
 