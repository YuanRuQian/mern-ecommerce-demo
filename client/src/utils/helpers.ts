import { Product } from "./types";

export const isProductFavorite = (
    productId: string,
    currentFavorites: Product[]
) => {
    return currentFavorites.some((x) => x._id === productId);
};
