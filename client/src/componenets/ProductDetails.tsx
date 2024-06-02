import { Box, Grid, Typography } from "@mui/material";
import { ProductCard } from "./ProductList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect, useState } from "react";
import {
    getProductDetailsAsync,
    getSameBrandProductsAsync
} from "../slice/productDetailsSlice";
import { useAppSelector } from "../hook";
import { useParams } from "react-router-dom";

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
            {productDetails && <ProductCard product={productDetails} />}
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
                            <ProductCard
                                clickable
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
};

export default ProductDetails;
