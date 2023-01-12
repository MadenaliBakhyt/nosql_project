const mongoose=require("mongoose")

const ProductSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        categories:{type:Array,required:true},
        price:{type:Number,required:true},
        description:{type:String,required:true},
        amountLeft:{type:Number,required:true},
        rating:{type:Number,required:true},


    },{timestamps:true}
)

module.exports=mongoose.model("Product",ProductSchema)