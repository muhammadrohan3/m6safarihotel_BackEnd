import drinksModel from "../models/drinksModel.js";
import foodModel from "../models/foodModel.js";
import foodSalesModel from "../models/foodSales.js";
import drinkSalesModel from "../models/drinkSalesModel.js";

export const salesController = {
    addFoodSales: async (req, res) => {
        try {
            const food = await foodModel.findOne({ _id: req.body.foodItem })
            const foodSales = await foodSalesModel.create({ ...req.body, price: food.price })
            res.status(200).send({ msg: "Food Sales Added" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    getFoodSales: async (req, res) => {
        try {
            const foodSales = await foodSalesModel.find({}).populate('foodItem')
            res.status(200).send({ msg: "Food Sales Found", foodSales })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    addDrinkSales: async (req, res) => {
        try {
            const drink = await drinksModel.findOne({ _id: req.body.drinkItem })
            const drinkSales = await drinkSalesModel.create(req.body)
            await drinksModel.updateOne({ _id: req.body.drinkItem }, { $inc: { stock: -req.body.quantity } })
            res.status(200).send({ msg: "Drink Sales Added" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    getDrinkSales: async (req, res) => {
        try {
            const sales = await drinkSalesModel.find({}).populate('drinkItem' )
            res.status(200).send({ msg: "Drink Sales Found", sales })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    }, 
    addDrinks : async (req, res) => {
        try {
            const drink = await drinksModel.create(req.body)
            res.status(200).send({msg : "Drink Added"})
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    getDrinks : async (req, res) => {
        try {
            const drinks = await drinksModel.find({}).populate('addedBy')
            res.status(200).send({msg : "Drinks Found" , drinks})
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    addFood : async (req, res) => {
        try {
            const food = await foodModel.create(req.body)
            res.status(200).send({msg : "Food Added"})
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    getFood : async (req, res) => {
        try {
            const food = await foodModel.find({}).populate('addedBy')
            res.status(200).send({msg : "Food Found" , food})
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    }

}