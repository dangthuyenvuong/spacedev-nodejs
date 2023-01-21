import { Router } from 'express'
import UserController from '../controllers/user.js'
import { createValidateHandler } from '../middlewares/createValiateHandler.js'
import { validateNewUser } from '../utils/rule.js'
const userRouter = Router()


userRouter.get('/', UserController.getUser)
userRouter.post('/', createValidateHandler(validateNewUser), UserController.newUser)
userRouter.delete('/:email', UserController.deleteUser)
userRouter.patch('/:email', UserController.updateUser)
userRouter.get('/:email', UserController.getOneUser)

export default userRouter