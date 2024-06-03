import { Box, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect, useState } from "react";
import {
    getProductDetailsAsync,
    getSameBrandProductsAsync
} from "../slice/productDetailsSlice";
import { useAppSelector } from "../hook";
import { useParams } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { isProductFavorite } from "../utils/helpers";

const ProductDetails = () => {
    const { id } = useParams();
    const [showError, setShowError] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const productDetails = useAppSelector(
        (state) => state.productDetails.productDetails
    );
    const sameBrandProducts = useAppSelector(
        (state) => state.productDetails.sameBrandProducts
    ).filter((product) => product._id !== id);

    const currentUser = useAppSelector((state) => state.auth.user);

    const checkIsProductFavorite = (productId: string) => {
        if (!currentUser) {
            return false;
        }
        return isProductFavorite(productId, currentUser.favorites);
    };

    useEffect(() => {
        dispatch(getProductDetailsAsync(id as string))
            .unwrap()
            .catch(() => {
                setShowError(true);
            });
    }, [dispatch, id]);

    useEffect(() => {
        if (productDetails) {
            dispatch(getSameBrandProductsAsync(productDetails.brand._id));
        }
    }, [dispatch, productDetails]);

    return (
        <Box
            sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
            margin={2}
        >
            {productDetails && (
                <ProductCard
                    product={productDetails}
                    isFavorite={checkIsProductFavorite(productDetails._id)}
                />
            )}
            {showError && (
                <Typography variant="h4">
                    Product with id {id} not found
                </Typography>
            )}
            {sameBrandProducts.length > 0 && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                    margin={4}
                >
                    <Typography variant="h4">
                        Other Products from {productDetails?.brand.name}
                    </Typography>
                    <Grid container spacing={4} margin={2}>
                        {sameBrandProducts.map((product) => (
                            <Grid item xs={3} key={product._id}>
                                <ProductCard
                                    clickable
                                    key={product._id}
                                    product={product}
                                    isFavorite={checkIsProductFavorite(
                                        product._id
                                    )}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
};

export default ProductDetails;
