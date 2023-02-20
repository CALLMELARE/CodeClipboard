import { configureStore } from "@reduxjs/toolkit";
import MatrixReducer from "./matrix.store";

export default configureStore({
  reducer: {
    matrix: MatrixReducer,
  },
});
