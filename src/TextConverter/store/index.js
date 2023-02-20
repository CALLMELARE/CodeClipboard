import { configureStore } from "@reduxjs/toolkit";
import MatrixReducer from "./matrix.store";
import SettingsReducer from "./settings.store";
export default configureStore({
  reducer: {
    matrix: MatrixReducer,
    settings: SettingsReducer,
  },
});
