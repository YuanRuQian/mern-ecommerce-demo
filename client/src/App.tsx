import { ThemeProvider, createTheme } from "@mui/material/styles";
import ProductList from "./componenets/ProductList";
import Header from "./componenets/Header";

const theme = createTheme({
    // other theme properties
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <ProductList />
        </ThemeProvider>
    );
}

export default App;
