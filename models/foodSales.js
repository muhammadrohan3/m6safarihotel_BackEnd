import mongoose from  'mongoose'

const foodSchema = new mongoose.Schema({
    foodItem : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'food'
    } ,
    quantity : {
        type : Number ,
        required : true
    } ,
    total : {
        type : Number ,
        required : true
    } ,
    addedBy : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User'
    } 
}, {timestamps : true})

export default mongoose.model('foodSales' , foodSchema)

