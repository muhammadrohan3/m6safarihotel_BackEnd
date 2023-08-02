import express from 'express'
import {reportController} from '../controllers/reportController.js'

const router = express.Router()

router.get('/getdailyreport' , reportController.getDailyReport)
router.get('/getweeklyreport' , reportController.getWeeklyReport)
router.get('/getmonthlyreport' , reportController.getMonthlyReport)
router.get('/getmonthlydetailedreport' , reportController.getMonthlyDetailedReport)


export default router
