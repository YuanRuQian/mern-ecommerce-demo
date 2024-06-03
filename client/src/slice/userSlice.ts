import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../utils/types";

const BASE_URL = "http://localhost:5050/api/";

type UserSliceState = {
    users: User[];
};

const initialState: UserSliceState = {
    users: []
};

const getUsersAsync = createAsyncThunk("users/getUsersAsync", async () => {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get(`${BASE_URL}users`, {
        headers: {
            "x-access-token": token
        }
    });

    return response.data;
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsersAsync.fulfilled, (state, action) => {
            state.users = action.payload;
        });
    }
});

export { getUsersAsync };

export default userSlice.reducer;
