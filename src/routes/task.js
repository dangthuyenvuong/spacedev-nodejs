import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import validator from "../middlewares/validator";
import { required } from "../utils/validate";
import authGuard from '../middlewares/authGuard'

const taskRouter = Router()

const createTaskRule = {
    name: [required('Vui lòng nhập tên task')],
    description: [required()],
}

taskRouter.post('', authGuard, validator(createTaskRule), TaskController.createTask)

taskRouter.get('', authGuard, TaskController.getTask)

taskRouter.get('/:id', authGuard, TaskController.getOneTask)

taskRouter.put('/:id', authGuard, validator(createTaskRule), TaskController.updateTask)

taskRouter.delete('/:id', authGuard, TaskController.deleteTask)

export default taskRouter