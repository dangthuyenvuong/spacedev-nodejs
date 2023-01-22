import { Router } from 'express'
import UserController from '../controllers/user.js'
import { createValidateHandler } from '../middlewares/createValiateHandler.js'
import { validateNewUser } from '../utils/rule.js'
const userRouter = Router()

userRouter.get('/', UserController.getProfile)
// userRouter.post('/', createValidateHandler(validateNewUser), UserController.newUser)
// userRouter.delete('/:email', UserController.deleteUser)
userRouter.patch('/', UserController.updateUser)
// userRouter.get('/:email', UserController.getOneUser)
userRouter.post('/register',createValidateHandler(validateNewUser), UserController.register)

export default userRouter