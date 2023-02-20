import { createSlice } from "@reduxjs/toolkit";
import { MATRIX_MENU, MATRIX_CODE } from "../utils/constant";

export const MatrixSlice = createSlice({
  name: "matrix",
  initialState: {
    matrixMenu: [...MATRIX_MENU],
    matrixBlackList: [],
  },
  reducers: {
    addMatrixBlackList: (s, a) => {
      const code = a.payload.code;
      s.matrixBlackList = [...s.matrixBlackList, code];
    },
    deleteMatrixBlackList: (s, a) => {
      const code = a.payload.code;
      s.matrixBlackList = s.matrixBlackList.filter((x) => x.code !== code);
    },
  },
});

export const { addMatrixBlackList, deleteMatrixBlackList } =
  MatrixSlice.actions;

export default MatrixSlice.reducer;
