import { configureStore } from "@reduxjs/toolkit";
import CodeEditReducer from "./codeEdit.store";
import CodeHelpReducer from "./codeHelp.store";
import CodeSettingReducer from "./codeSetting.store";

export default configureStore({
  reducer: {
    edit: CodeEditReducer,
    help: CodeHelpReducer,
    setting: CodeSettingReducer,
  },
});
