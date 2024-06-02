import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import productDetailsReducer from "./slice/productDetailsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        productDetails: productDetailsReducer
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
