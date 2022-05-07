import { createSlice } from "@reduxjs/toolkit";

export const LoginInfo = createSlice({
	name: "LoginInfo",
	initialState: {
		userId: null,
		isAdmin: null,
	},
	reducers: {
		setUserId: (state, action) => {
			state.userId = action.payload;
			localStorage.setItem("userId", state.userId);
		},
		setIsAdmin: (state, action) => {
			state.isAdmin = action.payload;
			console.log(action.payload);
			localStorage.setItem("isAdmin", state.isAdmin);
		},
	},
});
export const { setUserId, setIsAdmin } = LoginInfo.actions;

export default LoginInfo.reducer;
