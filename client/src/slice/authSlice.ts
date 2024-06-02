import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RegisterProps, SignInProps, User } from "../utils/types";

const BASE_URL = "http://localhost:5050/api/auth/";

type AuthSliceState = {
    isUserLoggedIn: boolean;
    user: User | null;
};

// Define the initial state
const initialState: AuthSliceState = {
    isUserLoggedIn: false,
    user: null
};

// Async action creator to sign in
const signInAsync = createAsyncThunk(
    "auth/signInAsync",
    async ({ email, password }: SignInProps) => {
        const response = await axios.post(`${BASE_URL}signin`, {
            email,
            password
        });
        return response.data;
    }
);

// Async action creator to register
const registerAsync = createAsyncThunk(
    "auth/registerAsync",
    async ({ username, email, password }: RegisterProps) => {
        const response = await axios.post(`${BASE_URL}signup`, {
            username,
            email,
            password
        });
        return response.data;
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signOut(state) {
            console.log("signed out");
            state.isUserLoggedIn = false;
            state.user = null;
            localStorage.removeItem("accessToken");
        }
    },
    extraReducers: (builder) => {
        // Add extra reducers for async actions
        builder
            .addCase(signInAsync.fulfilled, (state, action) => {
                state.isUserLoggedIn = true;
                state.user = action.payload.userData;
                localStorage.setItem("accessToken", action.payload.accessToken);
            })

            .addCase(registerAsync.fulfilled, (state, action) => {
                state.isUserLoggedIn = true;
                state.user = action.payload.userData;
                localStorage.setItem("accessToken", action.payload.accessToken);
            });
    }
});

export { signInAsync, registerAsync };

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
