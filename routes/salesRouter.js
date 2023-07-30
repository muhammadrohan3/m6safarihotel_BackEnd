import express from 'express'
import { salesController } from '../controllers/salesControlles.js'

const router = express.Router()

router.post('/addFoodSales' , salesController.addFoodSales)
router.get('/getFoodSales' , salesController.getFoodSales)
router.post('/addDrinkSales' , salesController.addDrinkSales)
router.get('/getDrinkSales' , salesController.getDrinkSales)
router.post('/addDrink' , salesController.addDrinks)
router.get('/getDrinks' , salesController.getDrinks)
router.post('/addFood' , salesController.addFood)
router.get('/getFood' , salesController.getFood)

export default router