import React from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { NormalInputs } from "../../../../ModularComponents/Inputs/Inputs";

export default function CreateFolderModal(props) {
	const [show, setShow] = React.useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [name, setName] = React.useState(null);
	const handleModalInputBlur = (e) => {
		setName(e.target.value);
		console.log(name);
	};
	return (
		<Modal
			{...props}
			// size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Create New folder
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className='show-grid'>
				<Container>
					<NormalInputs
						type='text'
						placeholder='Folder name'
						label='Folder Name'
						onBlur={handleModalInputBlur}
					/>
				</Container>
			</Modal.Body>
			<Modal.Footer className='justify-content-center'>
				<Button
					onClick={() => {
						props.onCreate(name);
						// props.onHide();
					}}>
					Create
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
