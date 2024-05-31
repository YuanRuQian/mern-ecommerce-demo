import { Schema, model } from "mongoose";

const typeSchema = Schema({
    name: {
        type: String,
        required: true
    }
})

const type = model("Type", typeSchema)

export default type;