import mongoose from 'mongoose'

const roomBookingSchema = new mongoose.Schema({
    room : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'rooms'
    } ,
    customerName : {
        type : String ,
        required : true
    } ,
    customerId : {
        type : String ,
        required : true
    } ,
    checkIn : {
        type : Date ,
        required : true
    } ,
    checkOut : {
        type : Date ,
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

export default mongoose.model('roomBooking' , roomBookingSchema)