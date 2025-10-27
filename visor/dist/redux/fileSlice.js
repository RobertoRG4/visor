var _a;
/* eslint-disable @typescript-eslint/no-explicit-any */
// store/fileSlice.ts
import { createSlice } from "@reduxjs/toolkit";
var initialState = {
    selectedFile: null,
};
export var fileSlice = createSlice({
    name: "file",
    initialState: initialState,
    reducers: {
        setSelectedFile: function (state, action) {
            state.selectedFile = action.payload;
        },
        clearSelectedFile: function (state) {
            state.selectedFile = null;
        },
    },
});
export var setSelectedFile = (_a = fileSlice.actions, _a.setSelectedFile), clearSelectedFile = _a.clearSelectedFile;
export default fileSlice.reducer;
