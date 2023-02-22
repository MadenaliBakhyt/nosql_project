const mongoose=require("mongoose")

const ProductSchema=new mongoose.Schema({
        title:{type:String,required:true,unique:true},
        categories:{type:Array},
        price:{type:Number,required:true},
        desc:{type:String,required:true},
        img:{type:String,required:true},
        size:{type:String},
        color:{type:String},

    },{timestamps:true}
)

module.exports=mongoose.model("Product",ProductSchema)