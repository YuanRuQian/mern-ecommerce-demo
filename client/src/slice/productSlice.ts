import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product, ProductFilterProps } from "../utils/types";

const BASE_URL = "http://localhost:5050/api/products/";

type ProductSliceState = {
    products: Product[];
    loading: boolean;
    error: string | null;
};

// Define the initial state
const initialState: ProductSliceState = {
    products: [],
    loading: false,
    error: null
};

// Async action creator to get products
const getProductsAsync = createAsyncThunk(
    "products/getProductsAsync",
    async ({ page, type, brand }: ProductFilterProps) => {
        const response = await axios.get(BASE_URL, {
            params: { page, type, brand }
        });
        return response.data;
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearProducts(state) {
            state.products = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Add extra reducers for async actions
        builder
            .addCase(getProductsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductsAsync.fulfilled, (state, action) => {
                state.products = action.payload.products;
                state.loading = false;
                state.error = null;
            })
            .addCase(getProductsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || "Failed to fetch products";
            });
    }
});

export { getProductsAsync };

export const { clearProducts } = productSlice.actions;

export default productSlice.reducer;
