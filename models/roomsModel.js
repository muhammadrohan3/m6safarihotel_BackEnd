import mongoose from 'mongoose'

const roomSchema = mongoose.Schema({
    roomNumber : {
        type : Number ,
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
    },
    roomFloor : {
        type : String ,
        required : true
    },
    status : {
        type : Boolean, 
        default : true
    }
} , {
    timestamps : true
})

export default mongoose.model('rooms' , roomSchema)