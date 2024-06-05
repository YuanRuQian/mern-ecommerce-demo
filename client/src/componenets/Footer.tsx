import { Link, Typography } from "@mui/material";

const Footer = () => (
    <footer
        style={{
            backgroundColor: "white",
            borderTop: "2px solid black",
            position: "fixed",
            width: "100%",
            bottom: 0,
            fontSize: "25px",
            textAlign: "center"
        }}
    >
        <Typography variant="body1">
            Made by <Link href="https://github.com/YuanRuQian">Lydia Yuan</Link>
        </Typography>
    </footer>
);

export default Footer;
