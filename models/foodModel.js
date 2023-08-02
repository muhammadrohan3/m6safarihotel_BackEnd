import mongoose from 'mongoose'

const foodSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    } ,
    price : {
        type : Number ,
        required : true
    } ,
    addedBy : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User'
    },
    status : {
        type : Boolean, 
        default : true
    }
}, {timestamps : true})

export default mongoose.model('food' , foodSchema)   
