import express from 'express'
import { expenseController } from '../controllers/expensesController.js'
const router = express.Router()

router.post('/create' , expenseController.addExpenses)
router.get('/getexpenses' , expenseController.getExpenses)
router.delete('/deleteexpense/:id' , expenseController.deleteExpense)
router.put('/updateexpense/:id' , expenseController.updateExpense)
export default router