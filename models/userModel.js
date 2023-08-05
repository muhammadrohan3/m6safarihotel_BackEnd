import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    userName : {
        type : String,
        required : true,
        unique : true
    },
    fullName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['Super Admin' , 'Admin' , 'User'],
        default : 'User'
    },
    status : {
        type : Boolean, 
        default : true
    }
} , {timestamps : true})

export default mongoose.model('User' , userSchema)