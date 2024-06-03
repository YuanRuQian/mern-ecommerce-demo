import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppSelector } from "../hook";
import { Box, IconButton, Typography } from "@mui/material";
import { Product } from "../utils/types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { AppDispatch } from "../store";
import { removeProductFromFavoritesAsync } from "../slice/authSlice";

const columns: GridColDef[] = [
    {
        field: "brand",
        headerName: "Brand",
        width: 150
    },
    { field: "type", headerName: "Type", width: 150 },
    {
        field: "name",
        headerName: "Name",
        width: 400
    },
    {
        field: "id",
        headerName: "Link",
        width: 150,
        renderCell: (params) => {
            return (
                <Link to={`/product/details/${params.value}`}>
                    Product Details
                </Link>
            );
        }
    },
    {
        field: "delete",
        headerName: "Delete",
        renderCell: (params) => {
            return <DeleteButton favorite={params.value} />;
        }
    }
];

type DeleteButtonProps = {
    favorite: Product;
};

const DeleteButton = ({ favorite }: DeleteButtonProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const removeProductFromFavorites = () => {
        dispatch(removeProductFromFavoritesAsync(favorite._id));
    };

    return (
        <IconButton
            aria-label="add to favorites"
            onClick={removeProductFromFavorites}
        >
            <DeleteIcon />
        </IconButton>
    );
};

const MyFavorites = () => {
    const currentUser = useAppSelector((state) => state.auth.user);

    if (!currentUser) {
        return (
            <Typography variant="h3">
                Please login to see your favorites
            </Typography>
        );
    }

    if (currentUser.favorites.length === 0) {
        return (
            <Typography variant="h3">You have no current favorites!</Typography>
        );
    }

    const currentFavorites = currentUser.favorites.map((x) => {
        return {
            id: x._id,
            brand: x.brand.name,
            type: x.type.name,
            name: x.name,
            delete: x
        };
    });

    return (
        <Box
            margin={4}
            sx={{
                flexGrow: 1,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <DataGrid rows={currentFavorites} columns={columns} />
        </Box>
    );
};

export default MyFavorites;
