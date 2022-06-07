import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function PreviewModal(props) {
	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Preview
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='fs-5'>
					<pre>{props.text}</pre>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}
