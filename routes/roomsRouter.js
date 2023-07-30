import express from 'express'
import {roomController} from '../controllers/roomController.js'

const router = express.Router()

router.post('/addRoom' , roomController.addRoom)
router.get('/getRooms' , roomController.getRooms)
router.post('/addRoomBooking' , roomController.addRoomBooking)
router.post('/getAvailableRooms' , roomController.getAvailableRooms)
router.get('/getRoomBooking' , roomController.getRoomBookings)

export default router