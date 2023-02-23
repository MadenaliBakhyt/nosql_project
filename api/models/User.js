const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema(
    {
        name:{type:String,required:true,unique:false},
        surname:{type:String,required:true},
        password:{type:String,required:true},
        number:{type:String,required:false,unique:true},
        email:{type:String,required:true,unique:true},
        gender:{type:String,required:false},
        isAdmin:{
            type:Boolean,
            default:false
        }


    },{timestamps:true}
)

module.exports=mongoose.model("User",UserSchema)