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
    }
}, {timestamps : true})

export default mongoose.model('food' , foodSchema)   
