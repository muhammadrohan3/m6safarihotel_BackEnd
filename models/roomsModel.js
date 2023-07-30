import mongoose from 'mongoose'

const roomSchema = mongoose.Schema({
    roomNumber : {
        type : String ,
        unique : true ,
        required : true
    } ,
    roomType : {
        type : String ,
        required : true
    } ,
    roomPrice : {
        type : Number ,
        required : true
    }, 
    roomName : {
        type : String ,
        required : true
    }
} , {
    timestamps : true
})

export default mongoose.model('rooms' , roomSchema)