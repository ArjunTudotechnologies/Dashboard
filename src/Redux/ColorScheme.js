import { createSlice } from "@reduxjs/toolkit";

export const ColorScheme = createSlice({
	name: "color",
	initialState: {
		color: "#076EB3",
	},
	reducers: {
		getColor: (state, action) => {
			state.color = localStorage.getItem("color");
		},
		setColor: (state, action) => {
			state.color = action.payload;
			localStorage.setItem("color", state.color);
		},
	},
});
export const { setColor, getColor } = ColorScheme.actions;

export default ColorScheme.reducer;
