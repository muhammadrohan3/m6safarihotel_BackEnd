import roomsModel from "../models/roomsModel.js";
import roomBookingModel from "../models/roomBookingModel.js";
import moment from 'moment'


export const roomController = {
    addRoom : async (req, res) => {
        try {
            const room = await roomsModel.create(req.body)
            res.status(200).send({msg : "Room Added"})
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    getRooms : async (req, res) => {
        try {
            const rooms = await roomsModel.find({})
            res.status(200).send({msg : "Rooms Found" , rooms})
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    }, 
    addRoomBooking : async (req, res) => {
        try {
             const roomBooking = await roomBookingModel.create(req.body)
             return res.status(200).send({msg : "Room Booked"})
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    }, 
    getRoomBookings : async (req, res) => {
        try {
            const bookings = await roomBookingModel.find({}).populate('room')
            return res.status(200).send({msg : "Room Bookings Found" , bookings})
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    getAvailableRooms :  async (req, res) => {
        try {
          const { checkIn, checkOut } = req.body;
          const startDate = new Date(checkIn);
          const endDate = new Date(checkOut);
      
          const availableRooms = await roomBookingModel.find();
          const ids = [];
      
          availableRooms.forEach((room) => {
            if (room.checkIn <= endDate && room.checkOut >= startDate) {
              ids.push(room.room);
            }
          });
      
          let rooms = [];
          if (ids.length > 0) {
            console.log('here');
            rooms = await roomsModel.find({ _id: { $nin: ids } });
          } else {
            rooms = await roomsModel.find();
          }
      
          res.status(200).send(rooms);
        } catch (error) {
          return res.status(500).send({ msg: error.message });
        }
      }
      
}
//code to make filters
// function getWeekDateRange(date) {
//     const weekStart = new Date(date); // Clone the date to avoid mutating the original date
//     const weekEnd = new Date(date);
  
//     // Calculate the day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
//     const dayOfWeek = date.getDay();
  
//     // Calculate the difference in days between the current day and Sunday
//     const diff = dayOfWeek - 0;
  
//     // Calculate the starting (Sunday) date by subtracting the difference in days
//     weekStart.setDate(weekStart.getDate() - diff);
  
//     // Calculate the ending (Saturday) date by adding the remaining days (6 - dayOfWeek)
//     weekEnd.setDate(weekEnd.getDate() + (6 - dayOfWeek));
  
//     return {
//       start: weekStart,
//       end: weekEnd,
//     };
//   }
//   console.log(getWeekDateRange(new Date()))

/* 

checkIn date is before checkOut date
checkOut date is after checkIn date







*/