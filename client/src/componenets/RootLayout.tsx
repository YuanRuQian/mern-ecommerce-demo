import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const theme = createTheme({
    // other theme properties
});

const RootLayout = () => {
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Outlet />
        </ThemeProvider>
    );
};

export default RootLayout;
