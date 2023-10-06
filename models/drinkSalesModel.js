import mongoose from 'mongoose'

const drinkSalesSchema = mongoose.Schema({
    drinkItem: {
        type: mongoose.Types.ObjectId ,
        ref : "drinks" , 
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    addedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    timestamps : true
})

export default mongoose.model('drinkSales', drinkSalesSchema)