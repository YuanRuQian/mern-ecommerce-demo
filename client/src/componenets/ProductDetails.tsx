import { Box, Typography } from "@mui/material";
import { ProductCard } from "./ProductList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect, useState } from "react";
import { getProductDetailsAsync } from "../slice/productDetailsSlice";
import { useAppSelector } from "../hook";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();
    const [showError, setShowError] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const productDetails = useAppSelector(
        (state) => state.productDetails.productDetails
    );

    useEffect(() => {
        dispatch(getProductDetailsAsync(id as string))
            .unwrap()
            .catch(() => {
                setShowError(true);
            });
    }, [dispatch, id]);

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
        </Box>
    );
};

export default ProductDetails;
