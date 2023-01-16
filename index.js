const express=require("express");
require("dotenv").config();
const cors=require("cors");
const { connection } = require("mongoose");
const {userRouter}=require("./routes/User.route");
const {postRouter}=require("./routes/Post.route")
const {authenticate}=require("./middlewares/authenticate.middleware")

const app=express();
app.use(cors({
    origin:"*"
}))

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Homepage - sprt-4 eval")
})

app.use("/users",userRouter)
app.use(authenticate);
app.use("/posts",postRouter)


app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("Connected to the DB")
    }catch(err){
        console.log("Trouble connecting to the DB")
        console.log(err)
    }
    console.log(`Server is running at the port ${process.env.port}`)
})