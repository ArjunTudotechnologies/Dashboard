import { createSlice } from "@reduxjs/toolkit";

export const LoginInfo = createSlice({
	name: "LoginInfo",
	initialState: {
		userId: null,
	},
	reducers: {
		setUserId: (state, action) => {
			state.userId = action.payload;
			localStorage.setItem("userId", state.userId);
		},
	},
});
export const { setUserId } = LoginInfo.actions;

export default LoginInfo.reducer;
