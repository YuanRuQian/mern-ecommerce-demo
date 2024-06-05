import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const theme = createTheme({
    // other theme properties
});

const RootLayout = () => {
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Outlet />
            <Footer />
        </ThemeProvider>
    );
};

export default RootLayout;
