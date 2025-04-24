const express = require("express")
const jwt = require("jsonwebtoken")
require('dotenv').config();
const port  = process.env.PORT || 4000
const app = express()
app.use(express.json())

const users =[]
let foundUser = null;
let token = null;
app.get("/nothing", (req,res)=>{
    res.send("you have sent nothing")
})
app.post("/signup", (req,res,next)=>{
    const {username,password} = req.body;
    users.push({
        username,
        password
    })
    res.json({
        message: "You are now registered!"
    })
    console.log(users);
    next()

})
app.post("/signin", (req,res,next)=>{
    const {username,password} = req.body;
    for(let i = 0; i<users.length; i++){
        if(users[i].username == username && users[i].password == password){
            foundUser = users[i];
        }
    }
    console.log(users);
    if(!foundUser){
        res.json("incorrect credentials")
    }else{
        token = jwt.sign({
            username,
            password
        },process.env.seceret)
    }
    res.json({
        token
    })
    next()
})
// now this one will be an authenticated endpoint -> means where you need to have a token or you need to 
// be signed in then only can you access it.

app.get("/me", (req,res)=>{
    const token = req.headers.token;
    const decodedData = jwt.verify(token , process.env.seceret);
    if(decodedData.username){
      for(let i = 0; i<users.length; i++){
        foundUser = users[i]
      }
      res.json({
        username: foundUser.username,
        password: foundUser.password
      })
    }else{
        res.json({
            message: "Your credentials are incorrect"
        })
    }
})

app.listen(process.env.PORT, ()=>{
    console.log(`App is listening on port ${process.env.PORT}`);
    
})