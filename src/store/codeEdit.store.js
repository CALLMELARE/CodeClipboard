import { Toast } from "@douyinfe/semi-ui";
import { createSlice } from "@reduxjs/toolkit";
import { create, modify, remove } from "../utils/code";
import dayjs from "dayjs";

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
    initItemData: (s, a) => {
      const { id, title, content, updated, created, locked, language, type } =
        a.payload;
      if (id) {
        s.data.id = id;
      }
      if (title) {
        s.data.title = title;
      }
      if (content) {
        s.data.content = content;
      }
      if (updated) {
        s.data.updated = updated;
      }
      if (created) {
        s.data.created = created;
      }
      if (locked !== undefined) {
        s.data.locked = locked;
      }
      if (language) {
        s.data.language = language;
      }
      if (type) {
        s.data.type = type;
      }
    },
    saveItemData: (s) => {
      const { id, title, content, updated, created, locked, language, type } =
        s;
      if (!id) {
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
    deleteItemData: (s) => {
      const id = s.data.id
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
    generateTitle: (s, a) => {
      const { titleFormat } = a.payload;
      const t = dayjs(Date.now()).format(titleFormat) || "";
      s.data.title = t;
    },
    changeFormData: (s, a) => {
      const { title, language, content, locked } = a.payload;
      s.data.title = title;
      s.data.language = language;
      s.data.content = content;
      s.data.locked = locked;
    },
    resetItemData: (s) => {
      s.data.title = "";
      s.data.language = "";
      s.data.content = "";
      s.data.locked = "";
    },
  },
});

export const {
  initItemData,
  saveItemData,
  deleteItemData,
  toggleFullScreen,
  toggleEditModalVisible,
  changeContentType,
  changeFormData,
  generateTitle,
  resetItemData,
} = CodeEditSlice.actions;

export default CodeEditSlice.reducer;
