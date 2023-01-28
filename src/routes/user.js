import { Router } from "express";
import validator from "../middlewares/validator";
import { isEmail, minMax, password, required } from "../utils/validate";
import { UserController } from "../controllers/user.controller";
import authGuard from '../middlewares/authGuard'

const userRouter = Router()

const registerRule = {
    username: [required(), isEmail()],
    password: [
        required(),
        minMax(6, 32),
        password()
    ],
    name: [required()]
}

const updateUserRule = {

}
userRouter.get('', authGuard, validator(updateUserRule), UserController.getUser)
userRouter.post('/register', validator(registerRule), UserController.register)
userRouter.patch('', authGuard, validator(updateUserRule), UserController.updateProfile)

export default userRouter