import { configureStore } from "@reduxjs/toolkit";
import CodeEditReducer from "./codeEdit.store";

export default configureStore({
  reducer: {
    edit: CodeEditReducer,
  },
});
