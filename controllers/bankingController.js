import bankingModel from '../models/bankingModel.js';

export const bankingController = {
    addBanking: async (req, res) => {
        try {
            const banking = await bankingModel.create({ ...req.body })
            res.status(200).send({ msg: "Banking Added" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    getBanking: async (req, res) => {
        try {
            const banking = await bankingModel.find({}).populate('addedBy').sort({ createdAt: -1 })
            res.status(200).send({ msg: "Banking Found", banking })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    deleteBanking: async (req, res) => {
        try {
            const banking = await bankingModel.deleteOne({ _id: req.params.id })
            res.status(200).send({ msg: "Banking Deleted" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    },
    updateBanking: async (req, res) => {
        try {
            const banking = await bankingModel.updateOne({ _id: req.params.id }, { ...req.body })
            res.status(200).send({ msg: "Banking Updated" })
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    }
}