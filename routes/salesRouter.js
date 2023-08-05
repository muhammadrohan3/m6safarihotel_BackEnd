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
router.delete('/deleteFood/:id' , salesController.deleteFood)
router.delete('/deleteDrink/:id' , salesController.deleteDrink)
router.put('/updateFood/:id' , salesController.updateFood)
router.put('/updateDrink/:id' , salesController.updateDrink)
router.put('/updateFoodSales/:id' , salesController.updateFoodSales)
router.delete('/deleteFoodSales/:id' , salesController.deleteFoodSales)
router.delete('/deleteDrinkSales/:id' , salesController.deleteDrinkSales)
router.put('/updateDrinkSales/:id' , salesController.updateDrinkSales)
router.post('/addDrinkStock' , salesController.addStock)
router.get('/getDrinksStock' , salesController.getStock)
router.put("/updateDrinkStock/:id" , salesController.updateDrinkStock)
router.delete("/deleteDrinkStock/:id" , salesController.deleteDrinkStock)
export default router