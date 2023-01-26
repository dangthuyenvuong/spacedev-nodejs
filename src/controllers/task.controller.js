import Task from '../models/task'

export const TaskController = {
    createTask: (req, res) => {
        const { name, categories, members, description, startAt, endAt } = req.body
        const task = {
            id: Date.now(),
            name, categories, members, description, startAt, endAt,
            createdAt: Date.now()
        }
        Task.create(task)
        res.json(task)
    },
    getTask: (req, res) => {
        res.json(Task.find())
    },
    getOneTask: (req, res) => {
        const { id } = req.params
        const task = Task.findById(id)
        res.json(task)
    },
    updateTask: (req, res) => {
        const { id } = req.params
        const { name, categories, members, description, createdAt, startAt, endAt } = req.body
        const task = Task.updateById(id, { name, categories, members, description, createdAt, startAt, endAt })
        if (task) {
            res.json(task)
        } else {
            res.status(403).send('Task không tồn tại')
        }
    },
    deleteTask: (req, res, next) => {
        const { id } = req.params
        const check = Task.deleteById(id)
        if (check) {
            res.sendStatus(204)
        } else {
            // 2 dòng này đều giống nhau chỉ chọn 1 trong 2, error handler sẽ nhận đc tham số error là 1 object kiểu Error
            // next(new Error('Task không tồn tại'))
            throw new Error('Task không tồn tại')
        }
    }
}