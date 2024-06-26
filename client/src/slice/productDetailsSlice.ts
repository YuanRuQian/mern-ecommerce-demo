import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../utils/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type ProductDetailsSliceState = {
    productDetails: Product | null;
    sameBrandProducts: Product[];
};

const initialState: ProductDetailsSliceState = {
    productDetails: null,
    sameBrandProducts: []
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

const getSameBrandProductsAsync = createAsyncThunk(
    "products/getSameBrandProductsAsync",
    async (brandId: string) => {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
            `${BASE_URL}products/brand/${brandId}`,
            {
                headers: {
                    "x-access-token": token
                }
            }
        );

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
        builder.addCase(getSameBrandProductsAsync.pending, (state) => {
            state.sameBrandProducts = [];
        });
        builder.addCase(
            getSameBrandProductsAsync.fulfilled,
            (state, action) => {
                state.sameBrandProducts = action.payload;
            }
        );
        builder.addCase(getSameBrandProductsAsync.rejected, (state) => {
            state.sameBrandProducts = [];
        });
    }
});

export { getProductDetailsAsync, getSameBrandProductsAsync };

export default productDetailsSlice.reducer;
