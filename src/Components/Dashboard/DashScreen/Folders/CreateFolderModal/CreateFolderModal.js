import React from "react";
import { Button, Container, Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import ColorPicker from "../../../../ColorPicker/ColorPicker";
import {
	NormalInputs,
	SelectInputs,
} from "../../../../ModularComponents/Inputs/Inputs";

export default function CreateFolderModal(props) {
	const [show, setShow] = React.useState(false);
	const [errorMsg, setErrorMsg] = React.useState("");
	const { loading } = useSelector((state) => state.loading);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [createData, setCreateData] = React.useState({});
	const handleModalInputBlur = (e) => {
		let name = e.target.name;
		const value = e.target.value;
		if (name === "Tag") name = "parent";
		if (name === "Folder Name") {
			name = "name";
			const pattern = /^[A-Z][a-zA-Z0-9]*$/;
			if (!pattern.test(value) && value.length != 0) {
				setErrorMsg("Folder name must start with Capital letter!");
			} else {
				setErrorMsg("");
			}
		}
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
					<span className='text-danger'>{errorMsg}</span>
					<ColorPicker addColor={colorAdd} />
					<SelectInputs
						data={[
							{
								value: "Employee Files",
								name: "Employee Files",
							},
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
				{loading ? (
					<div className='d-flex align-items-center justify-content-center'>
						<Spinner animation='border' role='status'>
							<span className='visually-hidden'>Loading...</span>
						</Spinner>
					</div>
				) : (
					<Button
						disabled={errorMsg.length != 0}
						className='btn-dark'
						onClick={() => {
							props.onCreate(createData);
						}}>
						Create
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
}
