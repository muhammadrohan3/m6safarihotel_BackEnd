import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const hashPassword = (password)=>{
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

export const userController = {
    createUser: async (req, res) => {
        try {
            console.log(req.body)
            const user = await userModel.create({...req.body , password : hashPassword(req.body.password)})
            await user.save()
            res.send("Something")
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }

    } , 
    getusers : async  (req, res) => {
        try {
            const users = await userModel.find({}).sort({ createdAt: -1 })
            res.send(users)
        }
        catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    }, 
    signIn : async (req, res) => {
        try {
            const {userName , password} = req.body
            console.log(req.body) 
            const user = await userModel.findOne({userName })
            if(!user){
                return res.status(400).send({msg : "User not found"})
            }
            const isMatch = bcrypt.compareSync(password, user.password)
            if(!isMatch){
                return res.status(400).send({msg : "Invalid Credentials"})
            }
            const token = jwt.sign({id : user._id , email : user.email , userName : user.userName} , process.env.JWT_SECRET , {expiresIn : '1d'})
            res.status(200).send({msg : "Logged In" , token : token , user : user})
        } catch (error) {
            return res.status(500).send({ msg: error.message }) 
        }
    }, 
    getUser : async (req, res) => {
        try {
            const data = jwt.decode(req.body.token)
            console.log(data)
            userModel.findOne({_id : data.userName})
            .then(user => {
                console.log(user)
                return res.status(200).send({msg : "User Found" , user })
            })
            .catch(err => {
                return res.status(400).send({msg : "User not found"})
            })
        
            
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    } , 
    deleteUser : async (req, res) => {
        try {
            const user = await userModel.deleteOne({_id : req.params.id})
            return res.status(200).send({msg : "User Deleted"})
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    }, 
    updateUser : async (req, res) => {
        try {
            console.log(req.body)
            let {email , fullName , role , userName} = req.body
            let obj = {email , fullName , role , userName }
            if(req.body.password){
                obj.password = hashPassword(req.body.password)
            }
            const user = await userModel.updateOne({_id : req.params.id} , {...obj})
            return res.status(200).send({msg : "User Updated"})
        } catch (error) {
            return res.status(500).send({ msg: error.message })
        }
    }
}
