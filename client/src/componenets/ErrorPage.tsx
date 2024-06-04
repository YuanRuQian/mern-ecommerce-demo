import { Box, Typography } from "@mui/material";

const ErrorPage = () => {
    return (
        <Box
            sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
            margin={2}
        >
            <Typography variant="h4">
                Umm... We have nothing to show here...
            </Typography>
        </Box>
    );
};

export default ErrorPage;
