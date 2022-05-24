import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ConfirmationModal(props) {
	return (
		<>
			<Modal
				show={props.show}
				onHide={props.handleClose}
				backdrop='static'
				keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Delete Confirmation</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{`Do you really want to delete the workflow "${props.itemName}"`}
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={props.handleClose}>
						Cancel
					</Button>
					<Button variant='danger' onClick={props.handleDelete}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
