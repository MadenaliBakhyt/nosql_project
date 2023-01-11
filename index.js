const express=require("express")
const app=express()
const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://Bakhyt:<password>@cluster0.zpzgnug.mongodb.net/test")
    .then(()=>console.log("Good"))
    .catch((err)=>console.log(err))

app.listen(5000,()=>{
    console.log("Server is running")
})