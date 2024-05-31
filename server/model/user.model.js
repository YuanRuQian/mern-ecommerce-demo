import { Schema } from "mongoose";

const userSchema = Schema({
    userId: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

const user = mongoose.model("User", userSchema)

export default user;