// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./fileSlice";
export var store = configureStore({
    reducer: {
        file: fileReducer,
    },
});
