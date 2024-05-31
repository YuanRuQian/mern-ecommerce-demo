import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ImageList, ImageListItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from 'react';

export type Product = {
    _id: string;
    name: string;
    images: string[];
    brandId: string;
    typeId: string;
}

const ProductCard = ({ name, images }: Product) => {
    return (
        <Grid item xs={6}>
            <Card>
                <CardContent>
            <h3>{name}</h3>
            <ImageList cols={3} sx={{ width: '100%' }}>
                {images.map((image) => (
                    <ImageListItem key={image}>
                        <div style={{ width: '200px', height: '200px' }}>
                            <img src={image} style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }} loading='lazy' alt={name} />
                        </div>
                    </ImageListItem>
                ))}
            </ImageList>
            </CardContent>
            </Card>
        </Grid>
    );
}

const ProductList = () => {
    
    const [products, setProducts] = useState<Product[]>([])


    useEffect(() => {
        fetch(`http://localhost:5050/product`)
            .then(res => res.json())
            .then(data => setProducts(data))
    })

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {
                    products.map(product => (
                        <ProductCard key={product._id} {...product} />
                    ))
                }
            </Grid>
        </Box>
    );
}

export default ProductList;
