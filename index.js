const express=require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv=require("dotenv")

const UserRoute=require("./routes/user")

dotenv.config()

mongoose.set("strictQuery", false)

mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("Good"))
    .catch((err)=>console.log(err))

app.use(express.json())
app.use("/api/user",UserRoute)

app.listen(5000,()=>{
    console.log("Server is running")
})