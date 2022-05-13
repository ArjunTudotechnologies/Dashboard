import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../Redux/IsLoading";
import { Spinner } from "react-bootstrap";

export default function UserTable() {
	const [users, setUsers] = useState([]);
	const { loading } = useSelector((state) => state.loading);
	const dispatch = useDispatch();
	const callforData = () => {
		dispatch(setLoading(true));
		axios
			.get("https://calm-beyond-84616.herokuapp.com/Users")
			.then((res) => {
				console.log(res.data);
				setUsers(res.data);
				dispatch(setLoading(false));
			})
			.catch((err) => console.log(err));
	};
	const handleStatus = (id, status) => {
		// console.log("he");
		axios
			.put(`https://calm-beyond-84616.herokuapp.com/Users/${id}`, {
				isAdmin: !status,
			})
			.then((res) => callforData())
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		callforData();
	}, []);
	if (loading) {
		return (
			<div className='w-100 h-50  d-flex align-items-center justify-content-center'>
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			</div>
		);
	}
	return (
		<div className='userTable p-4 bg-white m-4 rounded  '>
			<div className='headers'>
				<h3>Users</h3>
				<div className='d-flex fw-bold'>
					<div className='col-3'>Email</div>
					<div className='col-3'>Name</div>
					<div className='col-3'>Admin</div>
					<div className='col-3'>Action</div>
				</div>
			</div>
			<div className='usersList'>
				{users.map((item, ind) => (
					<div
						key={ind}
						className='d-flex align-items-center justify-content-center py-3 my-2'>
						<div className='col-3'>{item.data.email}</div>
						<div className='col-3'>{item.data.name}</div>
						<div className='col-3'>{item.data.isAdmin + ""}</div>
						<div className='col-3'>
							{item.data.isAdmin ? (
								<span
									onClick={() =>
										handleStatus(
											item.docId,
											item.data.isAdmin
										)
									}
									className='btn btn-danger'>
									Delete Admin
								</span>
							) : (
								<span
									onClick={() =>
										handleStatus(
											item.docId,
											item.data.isAdmin
										)
									}
									className='btn btn-success'>
									Make admin
								</span>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
