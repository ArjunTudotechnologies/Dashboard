import React from "react";
import { Button, Container, Modal } from "react-bootstrap";
import ColorPicker from "../../../../ColorPicker/ColorPicker";
import {
	NormalInputs,
	SelectInputs,
} from "../../../../ModularComponents/Inputs/Inputs";

export default function CreateFolderModal(props) {
	const [show, setShow] = React.useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [createData, setCreateData] = React.useState({});
	const handleModalInputBlur = (e) => {
		let name = e.target.name;
		const value = e.target.value;
		if (name === "Tag") name = "parent";
		if (name === "Folder Name") name = "name";
		setCreateData((prev) => {
			const newData = { ...prev };
			newData[name.toLowerCase()] = value;
			console.log(newData);
			return newData;
		});
		console.log(createData);
	};
	const colorAdd = (color) => {
		setCreateData((prev) => {
			const newData = { ...prev };
			newData["color"] = color;
			// console.log(newData);
			return newData;
		});
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
					<ColorPicker addColor={colorAdd} />
					<SelectInputs
						data={[
							{ value: "Employee Files", name: "Employee Files" },
							{ value: "Client Files", name: "Client Files" },
						]}
						type='text'
						placeholder='Tag name'
						label='Tag'
						onBlur={handleModalInputBlur}
					/>
				</Container>
			</Modal.Body>
			<Modal.Footer className='justify-content-center'>
				<Button
					onClick={() => {
						props.onCreate(createData);
					}}>
					Create
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
