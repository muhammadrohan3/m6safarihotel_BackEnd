import express from 'express';
import {bankingController} from '../controllers/bankingController.js';

const router = express.Router();

router.post('/addBanking', bankingController.addBanking);
router.get('/getBanking', bankingController.getBanking);
router.delete('/deleteBanking/:id', bankingController.deleteBanking);
router.put('/updateBanking/:id', bankingController.updateBanking);

export default router;