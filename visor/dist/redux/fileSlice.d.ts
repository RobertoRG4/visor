import { PayloadAction } from "@reduxjs/toolkit";
export interface FileState {
    selectedFile: any | null;
}
export declare const fileSlice: import("@reduxjs/toolkit").Slice<FileState, {
    setSelectedFile: (state: import("immer").WritableDraft<FileState>, action: PayloadAction<any>) => void;
    clearSelectedFile: (state: import("immer").WritableDraft<FileState>) => void;
}, "file", "file", import("@reduxjs/toolkit").SliceSelectors<FileState>>;
export declare const setSelectedFile: import("@reduxjs/toolkit").ActionCreatorWithPayload<any, "file/setSelectedFile">, clearSelectedFile: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"file/clearSelectedFile">;
declare const _default: import("redux").Reducer<FileState>;
export default _default;
