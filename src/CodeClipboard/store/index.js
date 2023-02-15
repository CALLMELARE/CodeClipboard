import { configureStore } from "@reduxjs/toolkit";
import StorageReducer from "./storage.store";
import CodeEditReducer from "./codeEdit.store";
import CodeHelpReducer from "./codeHelp.store";
import CodeSettingReducer from "./codeSetting.store";

export default configureStore({
  reducer: {
    storage: StorageReducer,
    edit: CodeEditReducer,
    help: CodeHelpReducer,
    setting: CodeSettingReducer,
  },
});
