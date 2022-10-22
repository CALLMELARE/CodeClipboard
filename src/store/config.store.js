import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export const ConfigSlice = createSlice({
  name: "config",
  initialState: {
    // 自动生成
    enableGenerateTitle: false,
    generateTitleFormat: "",
  },
  reducers: {
    generateTitle: (s) => {
      if (s.enableGenerateTitle && s.generateTitleFormat) {
        const t = dayjs(Date.now()).format(s.generateTitleFormat);
      }
    },
  },
});

export const { generateTitle } = ConfigSlice.actions;

export default ConfigSlice.reducer;
