import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
    },

    role:{
        type:String,
        enum:["user","hospital","admin"],
        default:"user",
    },

    favourites:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Hospital",
        }
    ]
},
{
    timestamps:true,
}
);

export default mongoose.model("User",userSchema);