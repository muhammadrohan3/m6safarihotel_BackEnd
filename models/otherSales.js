import mongoose from 'mongoose';

const otherSalesSchema = mongoose.Schema({
    date : {
        type : Date ,
        required : true
    },
    amount : {
        type : Number ,
        required : true
    } ,
    addedBy : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User'
    },
    details : {
        type : String ,
        required : true
    }
} , {timestamps : true})

export default mongoose.model('otherSales' , otherSalesSchema)