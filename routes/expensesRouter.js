import express from 'express'
import { expenseController } from '../controllers/expensesController.js'
const router = express.Router()

router.post('/create' , expenseController.addExpenses)
router.get('/getexpenses' , expenseController.getExpenses)
export default router