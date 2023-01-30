import HttpResponse from "../utils/HttpResponse"
import Course from '../models/course'
import Register from '../models/register'
export const CourseController = {
    getCourse: async (req, res) => {
        let { name, ...query } = req.query

        HttpResponse.paginate(
            res,
            Course.findAndPaginate({
                ...query,
                search: { name }
            }),
        )
    },
    getOneCourse: (req, res) => {
        HttpResponse.data(res, Course.findById(req.params.id).populate('mentors(firstName lastName createdAt), author(firstName lastName)'))
    },
    createCourse: (req, res) => {

        HttpResponse.data(res, Course.create({
            ...req.body,
            author: req.user._id
        }))
    },
    updateCourse: async (req, res) => {
        try {
            await Course.checkAuthor(req.params.id, req.user._id)
            HttpResponse.update(res, Course.updateOne({ _id: req.params.id }, req.body))
        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    deleteCourse: async (req, res) => {
        try {
            await Course.checkAuthor(req.params.id, req.user._id)
            HttpResponse.delete(res, Course.softDelete({ _id: req.params.id }))
        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    register: async (req, res) => {
        try {
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

                return HttpResponse.message(res, 'Đăng ký khóa học thành công')
            }

            throw new Error('Khóa học không tồn tại')

        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    enrollments: async (req, res) => {
        let { name, ...query } = req.query

        HttpResponse.paginate(
            res,
            Register.findAndPaginate({
                ...query,
                search: { name },
                user: req.user._id
            }),
        )
    },
    related: async (req, res) => {
        const { id } = req.params
        HttpResponse.paginate(res,
            Course.findAndPaginate({
                ...req.query,
                _id: {
                    $ne: id
                }
            }))
    }
}


