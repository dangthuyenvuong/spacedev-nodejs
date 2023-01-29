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

const loginByCodeRule = {
    code: [required()]
}

authRouter.post('/login', validator(loginRule), AuthController.login)
authRouter.post('/refresh-token', validator(refreshTokenRule), AuthController.refreshToken)
authRouter.post('/login-by-code',validator(loginByCodeRule), AuthController.loginByCode)

export default authRouter