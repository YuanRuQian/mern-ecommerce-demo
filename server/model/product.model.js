import { Schema, model, ObjectId } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
  type: {
    type: ObjectId,
    ref: "Type",
    required: true,
  },
  brand: {
    type: ObjectId,
    ref: "Brand",
    required: true,
  },
});

const Product = model("Product", productSchema);

export default Product;
