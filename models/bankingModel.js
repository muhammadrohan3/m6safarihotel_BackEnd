import mongoose from 'mongoose'

const bankigModel = mongoose.Schema({
    createdAt : {
        type : Date,
        default : Date.now()
    },
    amount : {
        type : Number,
        required : true
    },
    receipt : {
        type : String,
        required : true
    }, 
    addedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}
, {timestamps : true})

export default mongoose.model('Banking', bankigModel)
