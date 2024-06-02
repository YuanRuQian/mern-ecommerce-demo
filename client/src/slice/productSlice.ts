import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product, ProductFilterProps } from "../utils/types";

const BASE_URL = "http://localhost:5050/api/";

type ProductSliceState = {
    products: Product[];
    loading: boolean;
    error: string | null;
    totalPages: number;
    currentPage: number;
};

const initialState: ProductSliceState = {
    products: [],
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 0
};

const getProductsAsync = createAsyncThunk(
    "products/getProductsAsync",
    async ({ page, type, brand }: ProductFilterProps) => {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(`${BASE_URL}products`, {
            params: { page, type, brand },
            headers: {
                "x-access-token": token
            }
        });

        return response.data;
    }
);

const getBrandsAsync = createAsyncThunk("products/getBrandsAsync", async () => {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get(`${BASE_URL}brands`, {
        headers: {
            "x-access-token": token
        }
    });

    return response.data;
});

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        clearProducts(state) {
            state.products = [];
            state.loading = false;
            state.error = null;
            state.totalPages = 0;
            state.currentPage = 0;
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
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
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
