import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./slice/authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            immutableCheck: true,
            serializableCheck: true
        }).concat(process.env.NODE_ENV !== "production" ? [logger] : []),
    devTools: process.env.NODE_ENV !== "production"
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
