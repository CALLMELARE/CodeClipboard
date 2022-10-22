import { Toast } from "@douyinfe/semi-ui";
import { createSlice } from "@reduxjs/toolkit";
import { create, modify } from "../utils/code";

export const CodeEditSlice = createSlice({
  name: "edit",
  initialState: {
    id: undefined,
    title: "",
    content: "",
    updated: "",
    created: "",
    locked: false,
    language: "",
    type: undefined,
    behavior: {
      fullScreen: false,
    },
  },
  reducers: {
    saveItemData: (s) => {
      const { id, title, content, updated, created, locked, language, type } =
        s;
      if (id) {
        create({
          title,
          content,
          updated,
          created,
          locked,
          language,
          type,
        }).then((res) => {
          Toast.success(res);
        });
      } else {
        modify({
          id,
          title,
          content,
          updated,
          created,
          locked,
          language,
          type,
        }).then((res) => {
          Toast.success(res);
        });
      }
    },
    toggleFullScreen: (s) => {
      const prev = s.behavior.fullScreen;
      s.behavior.fullScreen = !prev;
    },
  },
});

export const { saveItemData, toggleFullScreen } = CodeEditSlice.actions;

export default CodeEditSlice.reducer;
