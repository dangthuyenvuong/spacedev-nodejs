import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import validator from "../middlewares/validator";
import { required } from "../utils/validate";

const taskRouter = Router()

const createTaskRule = {
    name: [required('Vui lòng nhập tên task')],
    description: [required()],
}

taskRouter.post('', validator(createTaskRule), TaskController.createTask)

taskRouter.get('', TaskController.getTask)

taskRouter.get('/:id', TaskController.getOneTask)

taskRouter.put('/:id', validator(createTaskRule), TaskController.updateTask)

taskRouter.delete('/:id', TaskController.deleteTask)

export default taskRouter