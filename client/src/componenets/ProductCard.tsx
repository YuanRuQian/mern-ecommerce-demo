import { ImageList, ImageListItem, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Product } from "../utils/types";
import { useNavigate } from "react-router-dom";

type ProductCardProps = {
    product: Product;
    clickable?: boolean;
};

export const ProductCard = ({ product, clickable }: ProductCardProps) => {
    const { name, images, brand } = product;
    const navigate = useNavigate();

    const navigateToProductDetails = () => {
        navigate(`/product/details/${product._id}`);
    };
    return (
        <Card
            onClick={clickable ? navigateToProductDetails : () => {}}
            style={{ cursor: clickable ? "pointer" : "default" }}
        >
            <CardContent>
                <Typography variant="h5">{brand.name}</Typography>
                <Typography variant="h6">{name}</Typography>
                <ImageList cols={3} sx={{ width: "100%" }}>
                    {images.map((image) => (
                        <ImageListItem key={image}>
                            <div style={{ width: "200px", height: "200px" }}>
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
    );
};
