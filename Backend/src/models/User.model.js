import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        
        userName:{
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        
        Email:{
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        
        fullName:{
            type: String,
            required: true,
        },
        
        role:{
            type:String,
            eNum:["TALENT", "EMPLOYER"]

        },
        
        profile:{
            type:String, //url
            
        },
        cover:{
            type:String //url
            
        },
        
        password:{
            type:String,
            required: [true, "Password is necessary"],
            min: 8,

        }

    },
    {timestamps: true }
)



export const User = mongoose.model("User", userSchema)