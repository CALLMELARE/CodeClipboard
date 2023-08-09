import { createSlice } from '@reduxjs/toolkit';

export const CodeHelpSlice = createSlice({
    initialState: {
        behavior: {
            helpDrawerVisible: false,
        },
    },
    name: 'help',
    reducers: {
        toggleHelpDrawerVisible: (s) => {
            const prev = s.behavior.helpDrawerVisible;
            s.behavior.helpDrawerVisible = !prev;
        },
    },
});

export const { toggleHelpDrawerVisible } = CodeHelpSlice.actions;

export default CodeHelpSlice.reducer;
