import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
    ImageList,
    ImageListItem,
    Pagination,
    Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { Product } from "../utils/types";

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
    const [products, setProducts] = useState<Product[]>([]);

    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        fetch(`http://localhost:5050/api/products`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.products);
                setProducts(data.products);
            });
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <ProductCard key={product._id} {...product} />
                ))}
            </Grid>
            <Pagination count={3} page={page} onChange={handleChange} />
        </Box>
    );
};

export default ProductList;
