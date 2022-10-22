import { createSlice } from "@reduxjs/toolkit";

export const CodeHelpSlice = createSlice({
  name: "help",
  initialState: {
    behavior: {
      helpDrawerVisible: false,
    },
  },
  reducers: {
    toggleHelpDrawerVisible: (s) => {
      const prev = s.behavior.helpDrawerVisible;
      s.behavior.helpDrawerVisible = !prev;
    },
  },
});

export const { toggleHelpDrawerVisible } = CodeHelpSlice.actions;

export default CodeHelpSlice.reducer;
