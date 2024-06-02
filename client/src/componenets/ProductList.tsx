import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
    ImageList,
    ImageListItem,
    Pagination,
    Stack,
    Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect } from "react";
import { Product, ProductFilterProps } from "../utils/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { getProductsAsync } from "../slice/productSlice";
import { useAppSelector } from "../hook";

const ProductCard = ({ name, images, brand }: Product) => {
    return (
        <Grid item xs={4}>
            <Card>
                <CardContent>
                    <Typography variant="h5">{brand.name}</Typography>
                    <Typography variant="h6">{name}</Typography>
                    <ImageList cols={3} sx={{ width: "100%" }}>
                        {images.map((image) => (
                            <ImageListItem key={image}>
                                <div
                                    style={{ width: "200px", height: "200px" }}
                                >
                                    <img
                                        src={image}
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                            width: "auto",
                                            height: "auto"
                                        }}
                                        loading="lazy"
                                        alt={name}
                                    />
                                </div>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </CardContent>
            </Card>
        </Grid>
    );
};

const ProductList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const products = useAppSelector((state) => state.product.products);
    const totalPages = useAppSelector((state) => state.product.totalPages);
    const currentPage = useAppSelector((state) => state.product.currentPage);

    const [productFilter, setProductFilter] =
        React.useState<ProductFilterProps>({
            page: 1,
            type: "",
            brand: ""
        });

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
        >
            <Stack spacing={2}>
                {
                    // TODO: add filters of brand and type
                }
            </Stack>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <ProductCard key={product._id} {...product} />
                ))}
            </Grid>
            <Pagination
                size="large"
                count={totalPages}
                page={currentPage}
                onChange={handleChange}
            />
        </Box>
    );
};

export default ProductList;
