import express from 'express'
import {roomController} from '../controllers/roomController.js'

const router = express.Router()

router.post('/addRoom' , roomController.addRoom)
router.get('/getRooms' , roomController.getRooms)
router.post('/addRoomBooking' , roomController.addRoomBooking)
router.post('/getAvailableRooms' , roomController.getAvailableRooms)
router.get('/getRoomBooking' , roomController.getRoomBookings)
router.delete("/delete/:id" , roomController.deleteRoom)
router.put("/update/:id" , roomController.updateRoom)
router.put("/updateBooking/:id" , roomController.updateRoomBooking)
router.delete("/deleteBooking/:id" , roomController.deleteRoomBooking)

export default router