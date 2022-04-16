import { configureStore } from "@reduxjs/toolkit";
import logoStore from "./LocalStorage";
import locationUrl from "./locationUrl";
import ColorScheme from "./ColorScheme";

export default configureStore({
	reducer: {
		logo: logoStore,
		location: locationUrl,
		color: ColorScheme,
	},
});
