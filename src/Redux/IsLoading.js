import { createSlice } from "@reduxjs/toolkit";

export const IsLoading = createSlice({
	name: "IsLoading",
	initialState: {
		loading: false,
	},
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});
export const { setLoading } = IsLoading.actions;

export default IsLoading.reducer;
