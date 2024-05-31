import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './Header'
import { Box } from '@mui/material';


const theme = createTheme({
    // other theme properties
});

type RootLayoutProps = {
    children?: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Box sx={{ p: 16 }}>
            {children}
            </Box>
        </ThemeProvider>
    )
}

export default RootLayout
