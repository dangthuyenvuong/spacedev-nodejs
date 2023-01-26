import { Router } from "express";
import validator from "../middlewares/validator";
import { isEmail, required } from "../utils/validate";
import User from '../models/user'
const userRouter = Router()

const registerRule = {
    username: [required(), isEmail()],
    password: [required()],
    name: [required()]
}

const updateUserRule = {

}
userRouter.get('', validator(updateUserRule), async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(403).send(err.toString())
    }
})
userRouter.post('/register', validator(registerRule), async (req, res) => {
    try {
        const { username, password, name } = req.body
        const user = await User.create({ username, password, name })
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(403).send(err.toString())
    }
})
userRouter.patch('/:id', validator(updateUserRule), async (req, res) => {
    try {
        const user = await User.updateOne({ _id: req.params.id }, req.body)
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(403).send(err.toString())
    }
})

export default userRouter