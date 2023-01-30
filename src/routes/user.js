import { Router } from "express";
import validator from "../middlewares/validator";
import { isEmail, minMax, notEqual, password, required } from "../utils/validate";
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

const updateUserRule = {}

const resendEmailRule = {
    username: [required(), isEmail()]
}

const validateChangePassword = {
    currentPassword: [
        required(),
        minMax(6, 32),
        password()
    ],
    newPassword: [
        required(),
        minMax(6, 32),
        password(),
        notEqual('currentPassword')
    ]
}

const resetPasswordRule = {
    username: [required(), isEmail()],
    redirect: [required()]
}

const changePasswordByCodeRule = {
    code: [required()],
    password: [
        required(),
        minMax(6, 32),
        password()
    ]
}

userRouter.get('', authGuard, validator(updateUserRule), UserController.getUser)
userRouter.post('/register', validator(registerRule), UserController.register)
userRouter.patch('', authGuard, validator(updateUserRule), UserController.updateProfile)

userRouter.get('/register-confirm/:code', UserController.registerConfirm)
userRouter.post('/resend-email', validator(resendEmailRule), UserController.resendEmail)
userRouter.post('/change-password', authGuard, validator(validateChangePassword), UserController.changePassword)
userRouter.post('/reset-password', validator(resetPasswordRule), UserController.resetPassword)
userRouter.post('/change-password-by-code', validator(changePasswordByCodeRule), UserController.changePasswordByCode)
userRouter.get('/check-code', UserController.checkCode)

export default userRouter