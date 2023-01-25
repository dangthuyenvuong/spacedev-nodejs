import { Router } from "express";
import Task from '../models/task'

const taskRouter = Router()


taskRouter.post('', (req, res) => {
    const { name, categories } = req.body
    const task = {
        id: Date.now(),
        name, categories
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
taskRouter.put('/:id', (req, res) => {
    const { id } = req.params
    const { name, categories } = req.body
    const task = Task.updateById(id, { name, categories })
    if (task) {
        res.json(task)
    } else {
        res.status(403).send('Task không tồn tại')
    }
})
taskRouter.delete('/:id', (req, res) => {
    const { id } = req.params
    const check = Task.deleteById(id)
    if (check) {
        res.sendStatus(204)
    } else {
        res.status(403).send('Task không tồn tại')
    }
})

export default taskRouter