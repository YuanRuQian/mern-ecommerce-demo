import { Box } from "@mui/material";
import { ProductCard } from "./ProductList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect } from "react";
import { getProductDetailsAsync } from "../slice/productDetailsSlice";
import { useAppSelector } from "../hook";

const ProductDetails = () => {
    const dispatch = useDispatch<AppDispatch>();
    const productDetails = useAppSelector(
        (state) => state.productDetails.productDetails
    );

    useEffect(() => {
        dispatch(getProductDetailsAsync("665bca9ba164795b24425ddc"));
    }, [dispatch]);

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
        </Box>
    );
};

export default ProductDetails;
