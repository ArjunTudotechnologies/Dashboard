import { createSlice } from "@reduxjs/toolkit";

export const locationUrl = createSlice({
	name: "locationUrl",
	initialState: {
		location: "",
	},
	reducers: {
		setlocation: (state, action) => {
			state.location = action.payload;
		},
	},
});
export const { setlocation } = locationUrl.actions;

export default locationUrl.reducer;
