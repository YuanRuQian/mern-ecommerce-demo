import { Schema, model, ObjectId } from "mongoose";

const userSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: ObjectId,
      ref: "Role",
    },
  ],
  favorites: [
    {
      type: ObjectId,
      ref: "Product",
    },
  ],
});

const user = model("User", userSchema);

export default user;
