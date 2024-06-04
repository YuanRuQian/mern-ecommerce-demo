import { Schema, model } from "mongoose";

const brandSchema = Schema({
  name: {
    type: String,
    required: true,
  },
});

const brand = model("Brand", brandSchema);

export default brand;
