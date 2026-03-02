import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    role: {
        type: String,
        enum: ["employee", "admin"],
        default: "admin"
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
})

const User = mongoose.model("User", UserSchema)
export default User;