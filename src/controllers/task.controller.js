import Task from '../models/task'
import HttpResponse from '../utils/HttpResponse'

export const TaskController = {
    createTask: async (req, res) => {
        try {
            const { name, categories, members, description, startAt, endAt } = req.body
            const task = {
                name, categories, members, description, startAt, endAt,
            }

            HttpResponse.data(res, await Task.create(task))
        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    getTask: async (req, res) => {
        try {
            HttpResponse.data(res, await Task.findTaskWithRelation())
        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    getOneTask: async (req, res) => {
        try {
            const { id } = req.params
            HttpResponse.data(res, await Task.findById(id))
        } catch (err) {
            HttpResponse.error(res, err)
        }

    },
    updateTask: async (req, res) => {
        try {
            const { id } = req.params
            const { name, categories, members, description, createdAt, startAt, endAt } = req.body

            const task = await Task.updateOne(id, { name, categories, members, description, createdAt, startAt, endAt })
            if (task) {
                HttpResponse.data(res, task)
            } else {
                HttpResponse.error(res, undefined, 'Task không tồn tại')
            }
        } catch (err) {
            HttpResponse.error(res, err)
        }

    },
    deleteTask: async (req, res, next) => {
        const { id } = req.params
        const check = await Task.deleteById(id)
        if (check) {
            res.sendStatus(204)
        } else {
            // 2 dòng này đều giống nhau chỉ chọn 1 trong 2, error handler sẽ nhận đc tham số error là 1 object kiểu Error
            // next(new Error('Task không tồn tại'))
            throw new Error('Task không tồn tại')
        }
    }
}