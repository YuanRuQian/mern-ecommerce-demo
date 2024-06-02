import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Brand, Product, ProductFilterProps, Type } from "../utils/types";

const BASE_URL = "http://localhost:5050/api/";

type ProductSliceState = {
    products: Product[];
    brands: Brand[];
    types: Type[];
    loading: boolean;
    error: string | null;
    totalPages: number;
    currentPage: number;
};

const initialState: ProductSliceState = {
    products: [],
    brands: [],
    types: [],
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 1
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

const getTypesAsync = createAsyncThunk("products/getTypesAsync", async () => {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get(`${BASE_URL}types`, {
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
            state.brands = [];
            state.types = [];
            state.loading = false;
            state.error = null;
            state.totalPages = 0;
            state.currentPage = 1;
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
            })
            .addCase(getBrandsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBrandsAsync.fulfilled, (state, action) => {
                state.brands = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getBrandsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch brands";
            })
            .addCase(getTypesAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTypesAsync.fulfilled, (state, action) => {
                state.types = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getTypesAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch types";
            });
    }
});

export { getProductsAsync, getBrandsAsync, getTypesAsync };

export const { clearProducts } = productSlice.actions;

export default productSlice.reducer;
