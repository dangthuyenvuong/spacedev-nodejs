import Course from '../models/course'
import Register from '../models/register'
import HttpResponse from "../utils/HttpResponse"
import { createController } from "../utils/createController"
import { delay } from '../utils/delay'
export const CourseController = createController({
    getCourse: async (req, res) => {
        let { name, ...query } = req.query

        return Course.findAndPaginate({
            ...query,
            search: { name }
        })
    },
    getOneCourse: (req, res) => {
        return Course.findById(req.params.id).populate('mentors(firstName lastName createdAt), author(firstName lastName)')
    },
    createCourse: (req, res) => {

        return Course.create({
            ...req.body,
            author: req.user._id
        })
    },
    updateCourse: async (req, res) => {
        await Course.checkAuthor(req.params.id, req.user._id)
        return Course.updateOne({ _id: req.params.id }, req.body)
    },
    deleteCourse: async (req, res) => {
        await Course.checkAuthor(req.params.id, req.user._id)
        return Course.softDelete({ _id: req.params.id })
    },
    register: async (req, res) => {
        const checkRegister = await Register.findOne({ course: req.params.id, user: req.user._id })
        if (checkRegister) {
            throw new Error('Tài khoản này đã đăng ký khóa học này')
        }

        const course = await Course.findById(req.params.id)
        if (course) {
            if (course.author.equals(req.user._id)) {
                throw new Error('Bạn không thể tự đăng ký chính khóa học của mình')
            }
            await Register.create({
                course: req.params.id,
                user: req.user._id,
                price: course.price,
            })

            return HttpResponse('Đăng ký khóa học thành công')
        }

        throw new Error('Khóa học không tồn tại')
    },
    enrollments: async (req, res) => {

        let { name, ...query } = req.query

        return Register.findAndPaginate({
            ...query,
            search: { name },
            user: req.user._id
        })
    },
    related: async (req, res) => {
        const { id } = req.params
        return Course.findAndPaginate({
            ...req.query,
            _id: {
                $ne: id
            }
        })
    }
})


