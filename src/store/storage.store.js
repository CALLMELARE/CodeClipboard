import { Toast } from "@douyinfe/semi-ui";
import { createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorage,
  getLocalStorageVolume,
  removeLocalStorage,
} from "../utils/storage";

export const StorageSlice = createSlice({
  name: "storage",
  initialState: {
    dataSource: getLocalStorage("data") || [],
    behavior: {
      isTesting: false,
    },
    info: {
      maxVolumn: 5 * 1024 * 1024,
      used: getLocalStorageVolume() || 0,
    },
  },
  reducers: {
    updateDataSource: (s) => {
      const rawData = getLocalStorage("data");
      s.dataSource = rawData;
    },
    updateUsedVolumn: (s) => {
      const used = getLocalStorageVolume();
      s.info.used = used;
    },
    updateMaxVolumn: (s) => {
      s.behavior.isTesting = true;
      let str = "0123456789";
      let t = setInterval(() => {
        let a = () => {
          try {
            let n = "";
            while (n.length < 1024) {
              n += "0123456789";
            }
            str += n;
            window.localStorage["test"] = str;
          } catch {
            s.info.maxVolumn = str.length + str.info.used;
            removeLocalStorage("test");
            Toast.success("测试完毕");
            s.behavior.isTesting = false;
            clearInterval(t);
          }
        };
        a();
      }, 0.1);
    },
  },
});

export const {
  updateDataSource,
  updateUsedVolumn,
  toggleFirstLoad,
  updateMaxVolumn,
} = StorageSlice.actions;

export default StorageSlice.reducer;
