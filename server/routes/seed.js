import express from "express";

// This will help us connect to the database
import db from "../model/index.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

router.post("/types", async (req, res) => {
    console.log(req.body);
    try {
        let newType = {
            name: req.body.name,
        };
        let collection = await db.collection("types");
        let result = await collection.insertOne(newType);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
})

router.post("/brands", async (req, res) => {
    console.log(req.body);
    try {
        let newBrand = {
            name: req.body.name,
        };
        let collection = await db.collection("brands");
        let result = await collection.insertOne(newBrand);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
})

router.post("/products", async (req, res) => {
    console.log(req.body);
    try {
        let newProduct = {
            name: req.body.name,
            images: req.body.images,
            brandId: req.body.brandId,
            typeId: req.body.typeId,
        };
        let collection = await db.collection("products");
        let result = await collection.insertOne(newProduct);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
})


export default router;