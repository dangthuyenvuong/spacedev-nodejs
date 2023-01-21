import { Router } from 'express'
import UserController from '../controllers/user.js'
const userRouter = Router()

userRouter.get('/', UserController.getUser)
userRouter.post('/', UserController.newUser)
userRouter.delete('/:email', UserController.deleteUser)
userRouter.patch('/:email', UserController.updateUser)

export default userRouter