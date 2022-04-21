import { configureStore } from "@reduxjs/toolkit";
import logoStore from "./LocalStorage";
import locationUrl from "./locationUrl";
import ColorScheme from "./ColorScheme";
import LoginInfo from "./LoginInfo";
import IsLoading from "./IsLoading";

export default configureStore({
	reducer: {
		logo: logoStore,
		location: locationUrl,
		color: ColorScheme,
		loginInfo: LoginInfo,
		loading: IsLoading,
	},
});
