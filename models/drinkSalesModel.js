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
    }
},{
    timestamps : true
})

export default mongoose.model('drinkSales', drinkSalesSchema)