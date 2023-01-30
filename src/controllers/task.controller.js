import Task from '../models/task'
import HttpResponse from '../utils/HttpResponse'
import { createController } from '../utils/createController'

export const TaskController = createController({
    createTask: async (req, res) => {
        const { name, categories, members, description, startAt, endAt } = req.body
        const task = {
            name, categories, members, description, startAt, endAt,
            author: req.user._id
        }
        return Task.create(task)
    },
    getTask: async (req, res) => {
        const { name, ...filter } = req.query
        return Task.findAndPaginate(
            {
                ...filter,
                search: { name },
                author: req.user._id
            }
        )
    },
    getOneTask: async (req, res) => {
        const { id } = req.params
        return Task.findOne({
            _id: id,
            author: req.user._id
        })

    },
    updateTask: async (req, res) => {
        const { id } = req.params
        const { name, categories, members, description, createdAt, startAt, endAt } = req.body

        const task = await Task.updateOne({
            _id: id,
            author: req.user._id
        }, { name, categories, members, description, createdAt, startAt, endAt })
        if (task) {
            return task
        } else {
            throw new Error('Task không tồn tại')
        }

    },
    deleteTask: async (req, res, next) => {
        const { id } = req.params
        const check = await Task.deleteOne({
            _id: id,
            author: req.user._id
        })
        if (check) {
            return new HttpResponse({
                message: 'Xóa task thành công', 
                status: 204,
            })
        } else {
            // 2 dòng này đều giống nhau chỉ chọn 1 trong 2, error handler sẽ nhận đc tham số error là 1 object kiểu Error
            throw new Error('Task không tồn tại')
            // throw new Error('Task không tồn tại')
        }
    }
})