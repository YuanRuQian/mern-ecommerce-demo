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
import { useEffect, useState } from "react";
import { Brand, Product, ProductFilterProps, Type } from "../utils/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { getProductsAsync } from "../slice/productSlice";
import { useAppSelector } from "../hook";
import { BrandsFilters, TypesFilters } from "./ProductFilters";
import { useNavigate } from "react-router-dom";

type ProductCardProps = {
    product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
    const { name, images, brand } = product;
    const navigate = useNavigate();

    const navigateToProductDetails = () => {
        navigate(`/product/details/${product._id}`);
    };
    return (
        <Grid item xs={4}>
            <Card onClick={navigateToProductDetails}>
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

    const [productFilter, setProductFilter] = useState<ProductFilterProps>({
        page: 1,
        type: "",
        brand: ""
    });

    const updateTypeFilters = (types: Type[]) => {
        setProductFilter({
            ...productFilter,
            type: types.map((x) => x._id).join(";")
        });
    };

    const updateBrandFilters = (brands: Brand[]) => {
        setProductFilter({
            ...productFilter,
            brand: brands.map((x) => x._id).join(";")
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
            margin={2}
        >
            <Stack spacing={2} direction="row" margin={2}>
                <BrandsFilters onBrandsChange={updateBrandFilters} />
                <TypesFilters onTypesChange={updateTypeFilters} />
            </Stack>
            {products.length > 0 ? (
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </Grid>
            ) : (
                <Typography variant="h2">No products found</Typography>
            )}
            {totalPages > 0 && (
                <Pagination
                    size="large"
                    count={totalPages}
                    page={currentPage}
                    onChange={handleChange}
                />
            )}
        </Box>
    );
};

export default ProductList;
