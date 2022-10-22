import { Toast } from "@douyinfe/semi-ui";
import { createSlice } from "@reduxjs/toolkit";
import { create, modify, remove } from "../utils/code";

export const CodeEditSlice = createSlice({
  name: "edit",
  initialState: {
    data: {
      id: "",
      title: "",
      content: "",
      updated: "",
      created: "",
      locked: false,
      language: "",
      type: "",
    },
    behavior: {
      // Modal
      fullScreen: false,
      editModalVisible: false,
    },
  },
  reducers: {
    initConfig: (s, a) => {},
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
    deleteItemData: (s, a) => {
      const id = a.payload.id;
      remove(id)
        .then((res) => {
          Toast.success(res);
        })
        .catch((err) => {
          Toast.error(err);
        });
    },
    toggleFullScreen: (s) => {
      const prev = s.behavior.fullScreen;
      s.behavior.fullScreen = !prev;
    },
    toggleEditModalVisible: (s) => {
      const prev = s.behavior.editModalVisible;
      s.behavior.editModalVisible = !prev;
    },
    changeContentType: (s, a) => {
      if (a.type === "TEXT") {
        s.type = "text";
      }
      if (a.type === "CODE") {
        s.type = "code";
      }
    },
    changeFormData: (s, a) => {},
  },
});

export const {
  saveItemData,
  deleteItemData,
  toggleFullScreen,
  toggleEditModalVisible,
  changeContentType,
  changeFormData,
} = CodeEditSlice.actions;

export default CodeEditSlice.reducer;
