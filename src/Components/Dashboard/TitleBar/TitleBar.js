import React from "react";
import Hamburger from "../../Hamburger/Hamburger";

export default function TitleBar(props) {
	return (
		<div className='screenTitle d-flex align-items-center'>
			<Hamburger />
			<span>{props.title}</span>
		</div>
	);
}
