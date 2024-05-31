import express from "express";
import cors from "cors";
import seed from "./routes/seed.js";
import product from "./routes/product.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/seed", seed);
app.use("/products", product);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Lydia's MERN demo." });
});



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});