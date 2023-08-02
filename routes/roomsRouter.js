import express from 'express'
import {roomController} from '../controllers/roomController.js'
import upload from '../utils/upload.js'

const router = express.Router()

router.post('/addRoom' , roomController.addRoom)
router.get('/getRooms' , roomController.getRooms)
router.post('/addRoomBooking' , upload.fields([{name : "customerId" , maxCount : 1}]) , roomController.addRoomBooking)
router.post('/getAvailableRooms' , roomController.getAvailableRooms)
router.get('/getRoomBooking' , roomController.getRoomBookings)
router.delete("/delete/:id" , roomController.deleteRoom)
router.put("/update/:id" , roomController.updateRoom)


export default router