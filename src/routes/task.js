import { Router } from "express";
import Task from '../models/task'
import { required } from "../utils/validate";
import validator from "../middlewares/validator";

const taskRouter = Router()

const createTaskRule = {
    name: [required('Vui lòng nhập tên task')],
    description: [required()],
}

taskRouter.post('', validator(createTaskRule), (req, res) => {
    const { name, categories, members, description, startAt, endAt } = req.body
    const task = {
        id: Date.now(),
        name, categories, members, description, startAt, endAt,
        createdAt: Date.now()
    }
    Task.create(task)
    res.json(task)
})

taskRouter.get('', (req, res) => {
    res.json(Task.find())
})

taskRouter.get('/:id', (req, res) => {
    const { id } = req.params
    const task = Task.findById(id)
    res.json(task)
})

taskRouter.put('/:id', validator(createTaskRule), (req, res) => {
    const { id } = req.params
    const { name, categories, members, description, createdAt, startAt, endAt } = req.body
    const task = Task.updateById(id, { name, categories, members, description, createdAt, startAt, endAt })
    if (task) {
        res.json(task)
    } else {
        res.status(403).send('Task không tồn tại')
    }
})

taskRouter.delete('/:id', (req, res, next) => {
    const { id } = req.params
    const check = Task.deleteById(id)
    if (check) {
        res.sendStatus(204)
    } else {
        // 2 dòng này đều giống nhau chỉ chọn 1 trong 2, error handler sẽ nhận đc tham số error là 1 object kiểu Error
        // next(new Error('Task không tồn tại'))
        throw new Error('Task không tồn tại')
    }
})

export default taskRouter