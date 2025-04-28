const express = require("express");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000
const seceret = process.env.seceret;
let foundUser = null;
app.use(express.json());
let users= [];
function auth(req,res,next){
    try {
        let token = req.headers.token;
        const decodedData = jwt.verify(token, process.env.seceret);
        if(decodedData){
            res.send("You are logged in")
        }else{
            res.end("You are not logged in...")
        }

    } catch (error) {
       res.send("You are not logged in, please sign in to continue..", error )
    }
    next()
}

app.get("/", (req,res,next)=>{
    res.send("hi the server is online...")
    next()
})
app.post("/signup", (req,res,next)=>{
    const { username , password }= req.body;
    users.push(({
        username,
        password
    }))
    res.json({
        Message:"You are now registered, please sign in to continue..."
    })
    next();
})
app.post("/signin", (req,res,next)=>{
    let {username} = req.body
    console.log();
    
    for (let i = 0; i < users.length; i++) {
        foundUser = users[i]   
    }
    if(foundUser){
        let token= jwt.sign({
            username: username
        },seceret);
        res.json({
            token,
        })
    }else{
        res.json({
            message: "You have entered invalid credentials..."
        })
    }
    next();
})
app.post("/me", auth, (req,res,next)=>{
    next();
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    
})