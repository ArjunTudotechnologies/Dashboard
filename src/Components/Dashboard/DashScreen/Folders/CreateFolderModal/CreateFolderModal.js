import React from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { NormalInputs } from "../../../../ModularComponents/Inputs/Inputs";

export default function CreateFolderModal(props) {
	const [show, setShow] = React.useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [createData, setCreateData] = React.useState({});
	const handleModalInputBlur = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setCreateData((prev) => {
			const newData = { ...prev };
			newData[name.toLowerCase()] = value;
			console.log(newData);
			return newData;
		});
		console.log(createData);
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
						placeholder='Parent name'
						label='Parent'
						onBlur={handleModalInputBlur}
					/>
					<NormalInputs
						type='text'
						placeholder='Folder name'
						label='Name'
						onBlur={handleModalInputBlur}
					/>
					<NormalInputs
						type='text'
						placeholder='Color hex .ex:#dd3d3d'
						label='Color'
						onBlur={handleModalInputBlur}
					/>
				</Container>
			</Modal.Body>
			<Modal.Footer className='justify-content-center'>
				<Button
				onClick={() => {
					props.onCreate(createData);
				}}
				>
					Create
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
