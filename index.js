const express=require("express")
const cors=require("cors")
require("dotenv").config()
const {connection}=require("./db")
const {userRouter}=require("./routes/user.route")

const {postRouter}=require("./routes/post.route")
const {authenticate}=require("./middleware")


const app = express()

app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (error) {
        console.log(error.message)
    }
    console.log("server is running");
})