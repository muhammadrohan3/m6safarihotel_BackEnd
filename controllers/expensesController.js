import expenseModel from '../models/expenseModel.js'

export const expenseController = {
    addExpenses: async (req, res) => {
        try {
            const date = new Date(req.body.date)
            const formattedDate = date.toLocaleDateString()
            const expense = await expenseModel.create({ ...req.body, date: formattedDate })
            res.status(200).send({ msg: "Expense Added" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    getExpenses: async (req, res) => {
        try {
            const expenses = await expenseModel.find({}).populate('addedBy')
            res.status(200).send({ msg: "Expenses Found", expenses })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    deleteExpense : async (req, res) => {
        try {
            const expense = await expenseModel.deleteOne({_id : req.params.id})
            res.status(200).send({msg : "Expense Deleted"})
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    updateExpense : async (req, res) => {
        try {
            const expense = await expenseModel.updateOne({_id : req.params.id} , {...req.body})
            res.status(200).send({msg : "Expense Updated"})
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    }
}


