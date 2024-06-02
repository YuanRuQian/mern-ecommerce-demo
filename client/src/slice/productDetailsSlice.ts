import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../utils/types";

const BASE_URL = "http://localhost:5050/api/";

type ProductDetailsSliceState = {
    productDetails: Product | null;
};

const initialState: ProductDetailsSliceState = {
    productDetails: null
};

const getProductDetailsAsync = createAsyncThunk(
    "products/getCurrentProductAsync",
    async (id: string) => {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(`${BASE_URL}products/${id}`, {
            headers: {
                "x-access-token": token
            }
        });

        return response.data;
    }
);

const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductDetailsAsync.pending, (state) => {
            state.productDetails = null;
        });
        builder.addCase(getProductDetailsAsync.fulfilled, (state, action) => {
            state.productDetails = action.payload;
        });
        builder.addCase(getProductDetailsAsync.rejected, (state) => {
            state.productDetails = null;
        });
    }
});

export { getProductDetailsAsync };

export default productDetailsSlice.reducer;
