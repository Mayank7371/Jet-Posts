require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { UserModel, TodoModel } = require("./db.js");
const { auth } = require("./auth.js");


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

const app = express();
app.use(express.json());

// --- JWT Secret ---
const JWT_SECRET_KEY = process.env.secret;

if (!JWT_SECRET_KEY) {
    console.error("FATAL ERROR: JWT_SECRET is not defined in .env file. Exiting.");
}


function logger(req, res, next) {
    console.log(`The request method was ${req.method} for path ${req.path}`);
    next();
}
app.use(logger); s

app.get('/status', (req, res) => {
    res.send("Server is up and running...");
});

app.post("/signup", async function (req, res) {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json({ message: "Email, username, and password are required." });
    }

    console.log("Signup attempt for email:", email, "password received:", password ? "Yes" : "No");

    try {
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ // 409 Conflict is more appropriate
                message: "User with this email already exists!",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password for signup:", hashedPassword);

        await UserModel.create({
            email: email,
            password: hashedPassword,
            username: username,
        });

        
        return res.status(201).json({ 
            message: "You are signed up!",
        });

    } catch (error) {
        console.error("SIGNUP ERROR:", error); 
        
        if (error.code === 11000) { 
            return res.status(409).json({
                message: "User with this email or username already exists (database constraint).",
            });
        }
        return res.status(500).json({
            message: "An error occurred during signup. Please try again.",
            error: error.message 
        });
    }
});


app.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    console.log("Signin attempt for email:", email, "password received:", password ? "Yes" : "No");


    try {
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            console.log("User not found for email:", email);
            return res.status(403).json({ 
                message: "Invalid Credentials!",
            });
        }

        console.log("User found. Stored hashed password:", user.password);

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result for", email, ":", passwordMatch);


        if (passwordMatch) {
            if (!JWT_SECRET_KEY) { 
                console.error("JWT_SECRET is not defined during token signing!");
                return res.status(500).json({ message: "Server configuration error: JWT secret missing." });
            }
            const token = jwt.sign(
                {
                    id: user._id.toString(),
                    username: user.username 
                },
                JWT_SECRET_KEY, 
                { expiresIn: "1h" } 
            );

            return res.json({
                token: token,
                message: "You are signed in!",
            });
        } else {
            return res.status(403).json({
                message: "Invalid Credentials!",
            });
        }
    } catch (error) {
        console.error("SIGNIN ERROR:", error);
        return res.status(500).json({
            message: "An error occurred during signin.",
            error: error.message 
        });
    }
});


app.post("/todo", auth, async function (req, res) {
    const userId = req.userId;
    const { title, done } = req.body;
    if (title === undefined || done === undefined) {
        return res.status(400).json({ message: "Title and done status are required." });
    }
    try {
        await TodoModel.create({ userId, title, done });
        res.status(201).json({ message: "Todo created" });
    } catch (error) {
        console.error("TODO CREATION ERROR:", error);
        res.status(500).json({ message: "Failed to create todo." });
    }
});

app.get("/todo", auth, async function (req, res) {
    const userId = req.userId;
    try {
        const todos = await TodoModel.find({ userId });
        res.json({ todos });
    } catch (error) {
        console.error("GET TODOS ERROR:", error);
        res.status(500).json({ message: "Failed to retrieve todos." });
    }
});


const PORT = process.env.PORT || 3000; // Fallback port
if (!process.env.PORT) {
    console.warn("PORT environment variable not set. Defaulting to 3000.");
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    if (!JWT_SECRET_KEY) { 
        console.warn("Warning: JWT_SECRET is not set in the environment variables. Authentication will fail to generate tokens.");
    }
});
