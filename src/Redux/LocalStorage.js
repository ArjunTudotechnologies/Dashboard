import { createSlice } from "@reduxjs/toolkit";

export const logoStore = createSlice({
	name: "logo",
	initialState: {
		logo: null,
	},
	reducers: {
		getLogo: (state) => {
			state.logo = localStorage.getItem("logo");
		},
		setLogo: (state) => {
			if (!state.logo) {
				localStorage.setItem(
					"logo",
					"https://www.dailyrounds.org/blog/wp-content/uploads/2015/05/caduceus.jpg"
				);
			}
		},
	},
});
export const { getLogo, setLogo } = logoStore.actions;

export default logoStore.reducer;
