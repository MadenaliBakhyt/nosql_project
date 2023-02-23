const express=require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv=require("dotenv")


const UserRoute=require("./routes/user")
const ProductRoute=require("./routes/product")
const AuthRoute=require("./routes/auth")
const CartRoute=require("./routes/cart")
const OrderRoute=require("./routes/order")

dotenv.config()

mongoose.set("strictQuery", false)

mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("Good"))
    .catch((err)=>console.log(err))

app.use(express.json())
app.use("/api/auth",AuthRoute)

app.use("/api/user",UserRoute)

app.use("/api/product",ProductRoute)

app.use("/api/cart",CartRoute)

app.use("/api/order",OrderRoute)


app.listen(5000,()=>{
    console.log("Server is running")
})