import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Pagination, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Brand, ProductFilterProps, Type } from "../utils/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { getProductsAsync } from "../slice/productSlice";
import { useAppSelector } from "../hook";
import { BrandsFilters, TypesFilters } from "./ProductFilters";
import { ProductCard } from "./ProductCard";
import { isProductFavorite } from "../utils/helpers";

const ProductList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const products = useAppSelector((state) => state.product.products);
    const totalPages = useAppSelector((state) => state.product.totalPages);
    const currentPage = useAppSelector((state) => state.product.currentPage);
    const currentUser = useAppSelector((state) => state.auth.user);

    const checkIsProductFavorite = (productId: string) => {
        if (!currentUser) {
            return false;
        }
        return isProductFavorite(productId, currentUser.favorites);
    };

    const [productFilter, setProductFilter] = useState<ProductFilterProps>({
        page: 1,
        type: "",
        brand: ""
    });

    const updateTypeFilters = (types: Type[]) => {
        setProductFilter({
            ...productFilter,
            type: types.map((x) => x._id).join(";"),
            page: 1
        });
    };

    const updateBrandFilters = (brands: Brand[]) => {
        setProductFilter({
            ...productFilter,
            brand: brands.map((x) => x._id).join(";"),
            page: 1
        });
    };

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setProductFilter({ ...productFilter, page: value });
    };

    useEffect(() => {
        dispatch(getProductsAsync(productFilter));
    }, [dispatch, productFilter]);

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
            margin={4}
        >
            <Stack spacing={2} direction="row" margin={2}>
                <BrandsFilters onBrandsChange={updateBrandFilters} />
                <TypesFilters onTypesChange={updateTypeFilters} />
            </Stack>
            {products.length > 0 ? (
                <Grid container spacing={2} margin={2}>
                    {products.map((product) => (
                        <Grid item xs={4} key={product._id}>
                            <ProductCard
                                clickable
                                product={product}
                                isFavorite={checkIsProductFavorite(product._id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="h2">No products found</Typography>
            )}
            {totalPages > 0 && (
                <Box margin={2}>
                    <Pagination
                        size="large"
                        count={totalPages}
                        page={currentPage}
                        onChange={handleChange}
                    />
                </Box>
            )}
        </Box>
    );
};

export default ProductList;
