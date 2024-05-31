import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    images: {
        type: [String],
    },
    brandId: {
        type: String,
        index: true,  
        required: true
    },
    typeId: {
        type: String,
        index: true,  
        required: true
    },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
