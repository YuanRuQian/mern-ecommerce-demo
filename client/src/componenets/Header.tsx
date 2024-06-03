import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SetMealIcon from "@mui/icons-material/SetMeal";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hook";
import { signOut } from "../slice/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

type MenuItem = {
    key: string;
    component: JSX.Element;
};

const LogoutLink = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(signOut());
    };

    return (
        <Link to="/" onClick={handleLogout}>
            Logout
        </Link>
    );
};

const loggedInPages: MenuItem[] = [
    { key: "products", component: <Link to="/products">Products</Link> },
    { key: "logout", component: <LogoutLink /> }
];
const loggedOutPages: MenuItem[] = [
    { key: "login", component: <Link to="/login">Login</Link> },
    {
        key: "register",
        component: <Link to="/register">Register</Link>
    }
];

const adminPages: MenuItem[] = [
    { key: "products", component: <Link to="/products">Products</Link> },
    { key: "users", component: <Link to="/users">Users</Link> },
    { key: "logout", component: <LogoutLink /> }
];

const ResponsiveAppBar = () => {
    const isUserLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);
    const isUserAdmin = useAppSelector((state) => state.auth.isUserAdmin);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const onMenuItemClick = (menuItem: MenuItem) => {
        const { key, component } = menuItem;
        return (
            <MenuItem key={key} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{component}</Typography>
            </MenuItem>
        );
    };

    const onUserMenuItemClick = (menuItem: MenuItem) => {
        const { key, component } = menuItem;
        return (
            <Button
                key={key}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
            >
                {component}
            </Button>
        );
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <SetMealIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none"
                        }}
                    >
                        FEESH
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" }
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left"
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" }
                            }}
                        >
                            {isUserAdmin
                                ? adminPages.map(onMenuItemClick)
                                : isUserLoggedIn
                                  ? loggedInPages.map(onMenuItemClick)
                                  : loggedOutPages.map(onMenuItemClick)}
                        </Menu>
                    </Box>
                    <SetMealIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none"
                        }}
                    >
                        FEESH
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" }
                        }}
                    >
                        {isUserAdmin
                            ? adminPages.map(onUserMenuItemClick)
                            : isUserLoggedIn
                              ? loggedInPages.map(onUserMenuItemClick)
                              : loggedOutPages.map(onUserMenuItemClick)}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
