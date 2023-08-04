import mongoose from 'mongoose'

const drinkStockSchema = mongoose.Schema({
    drinkItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'drinks'
    },
    stock: {
        type: Number,
        required: true
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

export default mongoose.model("DrinksStock" , drinkStockSchema)