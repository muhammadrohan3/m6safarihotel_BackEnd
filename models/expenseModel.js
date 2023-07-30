import mongoose from 'mongoose'
const expenseSchema = mongoose.Schema({
    expense : {
        type : String ,
        required : true
    } ,
    amount : {
        type : Number ,
        required : true
    } ,
    date : {
        type : Date ,
        required : true
    } ,
    addedBy : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User' ,
        required : true
    }
} , {timestamps : true})

export default mongoose.model('expense' , expenseSchema)
