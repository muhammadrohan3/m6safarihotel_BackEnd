import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './routes/user.js'
import expenseRouter from "./routes/expensesRouter.js"
import salesRouter from "./routes/salesRouter.js"
import roomsRouter from './routes/roomsRouter.js'
import mongoose from 'mongoose'
import reportRouter from './routes/reportRouter.js'
dotenv.config()
const app = express()
cors({ origin: true, credentials: true })
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }) 
    } catch (error) {
        dbConnection()
    }

}
dbConnection()

//routers
app.use('/api/users', userRouter)
app.use('/api/expenses' , expenseRouter)
app.use('/api/sales' , salesRouter)
app.use('/api/rooms' , roomsRouter)
app.use('/api/reports' , reportRouter)


  
  

const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})