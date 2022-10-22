import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, getLocalStorageVolume } from "../utils/storage";

export const StorageSlice = createSlice({
  name: "storage",
  initialState: {
    dataSource: [],
    info: {
      maxVolumn: 5 * 1024 * 1024,
      used: 0,
      firstLoad: true,
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
    toggleFirstLoad: (s) => {
      s.info.firstLoad = !s.info.firstLoad;
    },
  },
});

export const { updateDataSource, updateUsedVolumn, toggleFirstLoad } =
  StorageSlice.actions;

export default StorageSlice.reducer;
