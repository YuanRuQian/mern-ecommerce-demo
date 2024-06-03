import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { Fragment, useEffect, useState } from "react";
import { useAppSelector } from "../hook";
import { getUsersAsync } from "../slice/userSlice";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { User } from "../utils/types";
import { Link } from "react-router-dom";

type UserRowProps = {
    user: User;
};

const UserRow = ({ user }: UserRowProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">
                    {user.roles.map((x) => x.name).join("; ")}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Favorites
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            Brand
                                        </TableCell>
                                        <TableCell align="center">
                                            Type
                                        </TableCell>
                                        <TableCell align="center">
                                            Name
                                        </TableCell>
                                        <TableCell align="center">
                                            Link
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user.favorites.map((product) => (
                                        <TableRow key={product._id}>
                                            <TableCell align="center">
                                                {product.brand.name}
                                            </TableCell>
                                            <TableCell align="center">
                                                {product.type.name}
                                            </TableCell>
                                            <TableCell align="center">
                                                {product.name}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Link
                                                    to={`/product/details/${product._id}`}
                                                >
                                                    Product Details
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
};

type UsersTableProps = {
    users: User[];
};

const UsersTable = ({ users }: UsersTableProps) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="center">Username</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Roles</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <UserRow key={user._id} user={user} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const Users = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useAppSelector((state) => state.user.users);

    useEffect(() => {
        dispatch(getUsersAsync());
    }, [dispatch]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <UsersTable users={users} />
        </Box>
    );
};

export default Users;
