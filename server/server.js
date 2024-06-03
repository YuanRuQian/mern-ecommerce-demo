import express from "express";
import cors from "cors";
import seed from "./routes/seed.js";
import product from "./routes/product.js";
import user from "./routes/user.js";
import dbConfig from "./config/db.config.js";
import db from "./model/index.js";
import auth from './routes/auth.js'

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Lydia's MERN demo." });
});

// routes
auth(app);
product(app);
seed(app);
user(app);

console.log(`connection:\nmongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
}

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});