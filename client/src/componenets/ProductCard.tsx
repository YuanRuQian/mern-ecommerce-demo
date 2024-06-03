import {
    CardActions,
    IconButton,
    ImageList,
    ImageListItem,
    Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Product } from "../utils/types";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
    addProductToFavoritesAsync,
    removeProductFromFavoritesAsync
} from "../slice/authSlice";

type ProductCardProps = {
    product: Product;
    clickable?: boolean;
    isFavorite?: boolean;
};

export const ProductCard = ({
    product,
    clickable,
    isFavorite
}: ProductCardProps) => {
    const { name, images, brand } = product;
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const addProductToFavorites = () => {
        dispatch(addProductToFavoritesAsync(product._id));
    };

    const removeProductFromFavorites = () => {
        dispatch(removeProductFromFavoritesAsync(product._id));
    };

    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeProductFromFavorites();
        } else {
            addProductToFavorites();
        }
    };

    const navigateToProductDetails = () => {
        navigate(`/product/details/${product._id}`);
    };
    return (
        <Card style={{ cursor: clickable ? "pointer" : "default" }}>
            <CardContent
                onClick={clickable ? navigateToProductDetails : () => {}}
            >
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
            <CardActions>
                <IconButton
                    aria-label="add to favorites"
                    onClick={handleFavoriteClick}
                >
                    <FavoriteIcon color={isFavorite ? "error" : "action"} />
                </IconButton>
            </CardActions>
        </Card>
    );
};
