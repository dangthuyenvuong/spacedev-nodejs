import { Router } from "express";
import validator from "../middlewares/validator";
import AuthController from "../controllers/auth.controller";
import { isEmail, minMax, password, required } from "../utils/validate";

const authRouter = Router()

const loginRule = {
    username: [
        required(),
        isEmail()
    ],
    password: [
        required(),
        minMax(6, 32),
        password()
    ]
}

const refreshTokenRule = {
    refreshToken: [required()]
}

authRouter.post('/login', validator(loginRule), AuthController.login)
authRouter.post('/refresh-token', validator(refreshTokenRule), AuthController.refreshToken)

export default authRouter