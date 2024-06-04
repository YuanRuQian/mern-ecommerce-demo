import { Schema, model } from "mongoose";

const roleSchema = Schema({
  name: {
    type: String,
    required: true,
  },
});

const role = model("Role", roleSchema);

export default role;
