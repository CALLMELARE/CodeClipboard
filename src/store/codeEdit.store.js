import { Toast } from "@douyinfe/semi-ui";
import { createSlice } from "@reduxjs/toolkit";
import { create, modify, remove } from "../utils/code";
import dayjs from "dayjs";
import { getLocalStorage } from "../utils/storage";
import hljs from "highlight.js";
import { languages } from "../utils/constant";

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
      type: getLocalStorage("config")?.defaultType,
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
      if (!s.data.language) {
        // 自动检测语言
        const c = s.data.content;
        const lang = hljs.highlightAuto(c).language;
        console.log(lang);
        c &&
          languages.forEach((item) => {
            if (item.label.toLocaleUpperCase() === lang.toLocaleUpperCase()) {
              s.data.language = item.label;
              Toast.success(`检测到 ${item.label}`);
            }
          });
        if (c && lang === "cpp") {
          s.data.language = "C++";
          Toast.success(`检测到 C++`);
        }
        if (c && lang === "csharp") {
          s.data.language = "C#";
          Toast.success(`检测到 C#`);
        }
      }
      if (!s.data.id) {
        create(s.data).then((res) => {
          Toast.success(res);
        });
      } else {
        modify(s.data).then((res) => {
          Toast.success(res);
        });
      }
    },
    deleteItemData: (s) => {
      const id = s.data.id;
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
      const { type } = a.payload;
      if (type === "text") {
        s.data.type = "text";
      }
      if (type === "code") {
        s.data.type = "code";
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
      s.data.id = "";
      s.data.title = "";
      s.data.content = "";
      s.data.updated = "";
      s.data.created = "";
      s.data.locked = false;
      s.data.language = "";
      s.data.type = "";
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
