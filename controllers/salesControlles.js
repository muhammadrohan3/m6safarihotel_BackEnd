import drinksModel from "../models/drinksModel.js";
import foodModel from "../models/foodModel.js";
import foodSalesModel from "../models/foodSales.js";
import drinkSalesModel from "../models/drinkSalesModel.js";
import drinkStockModel from "../models/drinkStockModel.js";

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
            const foodSales = await foodSalesModel.find({}).populate('foodItem').sort({ createdAt: -1 })
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
            const sales = await drinkSalesModel.find({}).populate('drinkItem').sort({ createdAt: -1 })
            res.status(200).send({ msg: "Drink Sales Found", sales })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    addDrinks: async (req, res) => {
        try {

            const up = await drinksModel.updateMany({}, { type: "Soft Drink" })
            const drink = await drinksModel.create(req.body)
            res.status(200).send({ msg: "Drink Added" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    addStock: async (req, res) => {
        try {
            const updateStock = await drinksModel.updateOne({ _id: req.body.drinkItem }, { $inc: { stock: req.body.stock } })
            const stock = await drinkStockModel.create(req.body)
            res.status(200).send({ msg: "Stock Added" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }

    },
    getStock: async (req, res) => {
        try {
            console.log("here")
            const stock = await drinkStockModel.find({}).populate('drinkItem').populate("addedBy").sort({ createdAt: -1 })
            res.status(200).send({ msg: "Stock Found", stock })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    getDrinks: async (req, res) => {
        try {
            const sales = await drinksModel.aggregate([
                {
                    $lookup: {
                        from: "drinksales",
                        let: { drinkId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ["$drinkItem", "$$drinkId"] }
                                }
                            }
                        ],
                        as: "sales"
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "addedBy",
                        foreignField: "_id",
                        as: "addedByDetails"
                    }
                },
                {
                    $project: {
                        name: 1,
                        price: 1,
                        createdAt: 1,
                        addedBy: {
                            $arrayElemAt: ["$addedByDetails", 0]
                        },
                        stock: 1,
                        totalSales: { $sum: "$sales.total" },
                        totalQuantitySold: { $sum: "$sales.quantity" }
                    }
                },
                {
                    $sort: {
                        createdAt: -1 // Sort in descending order, use 1 for ascending order
                    }
                }
            ]);
            res.status(200).send({ msg: "Drinks Found", drinks: sales })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    addFood: async (req, res) => {
        try {
            const food = await foodModel.create(req.body)
            res.status(200).send({ msg: "Food Added" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    getFood: async (req, res) => {
        try {
            const food = await foodModel.find({}).populate('addedBy').sort({ createdAt: -1 })
            res.status(200).send({ msg: "Food Found", food })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    deleteFood: async (req, res) => {
        try {
            const food = await foodModel.deleteOne({ _id: req.params.id })
            res.status(200).send({ msg: "Food Deleted" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    deleteDrink: async (req, res) => {
        try {
            const drink = await drinksModel.deleteOne({ _id: req.params.id })
            res.status(200).send({ msg: "Drink Deleted" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    updateFood: async (req, res) => {
        try {
            const food = await foodModel.updateOne({ _id: req.params.id }, req.body)
            res.status(200).send({ msg: "Food Updated" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    updateDrink: async (req, res) => {
        try {
            const drink = await drinksModel.updateOne({ _id: req.params.id }, req.body)
            res.status(200).send({ msg: "Drink Updated" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    deleteFoodSales: async (req, res) => {
        try {
            const foodSales = await foodSalesModel.deleteOne({ _id: req.params.id })
            res.status(200).send({ msg: "Food Sales Deleted" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    updateFoodSales: async (req, res) => {
        try {
            const foodSales = await foodSalesModel.updateOne({ _id: req.params.id }, req.body)
            res.status(200).send({ msg: "Food Sales Updated" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    updateDrinkSales: async (req, res) => {
        try {
            const drinkSale = await drinkSalesModel.findOne({ _id: req.params.id })
            await drinksModel.updateOne({ _id: drinkSale.drinkItem }, { $inc: { stock: drinkSale.quantity } })
            await drinksModel.updateOne({ _id: req.body.drinkItem }, { $inc: { stock: -req.body.quantity } })
            const drinkSales = await drinkSalesModel.updateOne({ _id: req.params.id }, req.body)
            res.status(200).send({ msg: "Drink Sales Updated" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    deleteDrinkSales: async (req, res) => {
        try {
            const drinkSale = await drinkSalesModel.findOne({ _id: req.params.id })
            await drinksModel.updateOne({ _id: drinkSale.drinkItem }, { $inc: { stock: drinkSale.quantity } })
            const drinkSales = await drinkSalesModel.deleteOne({ _id: req.params.id })
            res.status(200).send({ msg: "Drink Sales Deleted" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    updateDrinkStock: async (req, res) => {
        try {
            console.log(req.body)
            const stock = await drinkStockModel.findOne({ _id: req.params.id })
            await drinksModel.updateOne({ _id: stock.drinkItem }, { $inc: { stock: -stock.stock } })
            const drinkStock = await drinkStockModel.updateOne({ _id: req.params.id }, req.body)
            await drinksModel.updateOne({ _id: stock.drinkItem }, { $inc: { stock: req.body.stock } })

            res.status(200).send({ msg: "Drink Stock Updated" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    deleteDrinkStock: async (req, res) => {
        try {
            const stock = await drinkStockModel.findOne({ _id: req.params.id })
            const drinkStock = await drinkStockModel.deleteOne({ _id: req.params.id })
            await drinksModel.updateOne({ _id: stock.drinkItem }, { $inc: { stock: -stock.stock } })
            res.status(200).send({ msg: "Drink Stock Deleted" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },


}