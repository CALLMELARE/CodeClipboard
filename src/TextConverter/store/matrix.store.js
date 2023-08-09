import { createSlice } from '@reduxjs/toolkit';

import { MATRIX_MENU } from '../utils/constant';

export const MatrixSlice = createSlice({
    initialState: {
        matrixBlackList: [],
        matrixMenu: [...MATRIX_MENU],
    },
    name: 'matrix',
    reducers: {
        addMatrixBlackList: (s, a) => {
            const { code } = a.payload;
            s.matrixBlackList = [...s.matrixBlackList, code];
        },
        deleteMatrixBlackList: (s, a) => {
            const { code } = a.payload;
            s.matrixBlackList = s.matrixBlackList.filter((x) => x.code !== code);
        },
    },
});

export const { addMatrixBlackList, deleteMatrixBlackList } = MatrixSlice.actions;

export default MatrixSlice.reducer;
