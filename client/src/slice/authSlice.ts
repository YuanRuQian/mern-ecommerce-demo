import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { isUserAdmin, RegisterProps, SignInProps, User } from "../utils/types";

const BASE_URL = "http://localhost:5050/api/";

type AuthSliceState = {
    isUserLoggedIn: boolean;
    isUserAdmin: boolean;
    user: User | null;
    accessToken: string | null;
};

// Function to initialize state from localStorage
const getInitialState = (): AuthSliceState => {
    const token = localStorage.getItem("accessToken");

    return {
        isUserLoggedIn: !!token,
        isUserAdmin: isUserAdmin(null),
        user: null,
        accessToken: token
    };
};

const loadUserInfoAsync = createAsyncThunk(
    "auth/loadUserInfoAsync",
    async () => {
        const token = localStorage.getItem("accessToken");
        const userId = localStorage.getItem("userId");
        if (!token) {
            throw new Error("User not logged in");
        }

        if (!userId) {
            throw new Error("User ID not found");
        }

        const response = await axios.get(`${BASE_URL}users/${userId}`, {
            headers: {
                "x-access-token": token
            }
        });

        console.log("User info loaded successfully");

        return response.data;
    }
);

const initialState: AuthSliceState = getInitialState();

const signInAsync = createAsyncThunk(
    "auth/signInAsync",
    async ({ email, password }: SignInProps) => {
        const response = await axios.post(`${BASE_URL}auth/signin`, {
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
        const response = await axios.post(`${BASE_URL}auth/signup`, {
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
            state.isUserAdmin = false;
            state.user = null;
            state.accessToken = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userId");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInAsync.fulfilled, (state, action) => {
                localStorage.setItem("accessToken", action.payload.accessToken);
                localStorage.setItem(
                    "userId",
                    (action.payload.userData as User)._id
                );
                state.isUserLoggedIn = true;
                state.isUserAdmin = isUserAdmin(
                    action.payload.userData as User
                );
                state.user = action.payload.userData;
                state.accessToken = action.payload.accessToken;
            })

            .addCase(registerAsync.fulfilled, (state, action) => {
                localStorage.setItem("accessToken", action.payload.accessToken);
                localStorage.setItem("userId", action.payload.userData._id);
                state.isUserLoggedIn = true;
                state.isUserAdmin = isUserAdmin(action.payload.userData);
                state.user = action.payload.userData;
                state.accessToken = action.payload.accessToken;
            });

        builder.addCase(loadUserInfoAsync.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isUserAdmin = isUserAdmin(action.payload);
            state.isUserLoggedIn = true;
        });
    }
});

export { signInAsync, registerAsync, loadUserInfoAsync };

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
