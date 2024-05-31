import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({ message: "Welcome to Lydia's MERN demo." });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});