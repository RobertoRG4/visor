import { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "./index";
export declare const useAppDispatch: () => import("redux-thunk").ThunkDispatch<{
    file: import("./fileSlice").FileState;
}, undefined, import("redux").UnknownAction> & import("redux").Dispatch<import("redux").UnknownAction>;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
