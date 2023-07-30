import mongoose from 'mongoose'

const drinksModel = mongoose.Schema({
    name : {
        type : String ,
        required : true
    } ,
    price : {
        type : Number ,
        required : true
    } ,
    stock : {
        type : Number ,
        required : true
    } ,
    addedBy : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User'
    }

} , { 
    timestamps : true
})
export default mongoose.model("drinks" , drinksModel)

