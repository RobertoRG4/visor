/* eslint-disable @typescript-eslint/no-explicit-any */
// store/fileSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FileState {
  selectedFile: any | null;
}
const initialState: FileState = {
  selectedFile: null,
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setSelectedFile: (state, action: PayloadAction<any>) => {
      state.selectedFile = action.payload;
    },
    clearSelectedFile: (state) => {
      state.selectedFile = null;
    },
  },
});

export const { setSelectedFile, clearSelectedFile } = fileSlice.actions;
export default fileSlice.reducer;
