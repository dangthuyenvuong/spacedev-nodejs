import { Router } from "express";
import validator from "../middlewares/validator";
import { isEmail, required } from "../utils/validate";
import { UserController } from "../controllers/user.controller";
const userRouter = Router()

const registerRule = {
    username: [required(), isEmail()],
    password: [required()],
    name: [required()]
}

const updateUserRule = {

}
userRouter.get('', validator(updateUserRule), UserController.getUser)
userRouter.post('/register', validator(registerRule), UserController.register)
userRouter.patch('/:id', validator(updateUserRule), UserController.updateProfile)

export default userRouter