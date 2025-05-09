const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;


const User = new Schema({
    email: {
        type: String,
        lowercase: true, // Good for emails to avoid case sensitivity issues
        trim: true,
        unique: true,
        required: true
    },
    username: {
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        type: String
    },
    password: { // Corrected password field
        required: true,
        type: String
        // removed lowercase, trim, and unique
    }
});

const Todo = new Schema({
    userId: ObjectId,
    done: {
        required: true,
        type: Boolean
    },
    title: String
})

const UserModel = mongoose.model("users", User) // where am i storing my mongodb data
const TodoModel = mongoose.model("todos", Todo)

module.exports = {
    UserModel,
    TodoModel
} 