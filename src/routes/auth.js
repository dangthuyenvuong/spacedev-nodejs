import { Router } from "express";
import { AuthController } from "../controllers/auth";
import { createValidateHandler } from "../middlewares/createValiateHandler";
import { validateLogin } from "../utils/rule";

const authRouter = Router()

authRouter.post('/login', createValidateHandler(validateLogin),AuthController.login)
authRouter.post('/refresh-token', AuthController.refreshToken)

export default authRouter