import express from 'express'
import {userController} from '../controllers/user.js'
const router = express.Router()


router.post('/create' , userController.createUser)
router.get('/getusers' , userController.getusers)
router.post('/signin' , userController.signIn)
router.post('/getuser' , userController.getUser)
router.put('/updateuser/:id' , userController.updateUser)
router.delete('/deleteuser/:id' , userController.deleteUser)
export default router