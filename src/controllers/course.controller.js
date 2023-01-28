import HttpResponse from "../utils/HttpResponse"
import Course from '../models/course'
import Register from '../models/register'
export const CourseController = {
    getCourse: async (req, res) => {
        let { name, fields, sort = '_id.desc', includes = '', limit = 10, page = 1, ...filter } = req.query
        const query = { ...filter }
        if (name) {
            query.name = {
                $regex: name,
                $options: 'i'
            }
        }

        HttpResponse.paginate(
            res,
            Course.find(query).select(fields).sort(sort).populate(includes).paginate(page, limit),
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
            HttpResponse.delete(res, Course.deleteOne({ _id: req.params.id }))
        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    register: async (req, res) => {
        try {
            const checkRegister = await Register.findOne({ courseId: req.params.id, userId: req.user._id })
            if (checkRegister) {
                throw new Error('Tài khoản này đã đăng ký khóa học này')
            }

            const course = await Course.findById(req.params.id)
            if (course) {
                if (course.author.equals(req.user._id)) {
                    throw new Error('Bạn không thể tự đăng ký chính khóa học của mình')
                }
                await Register.create({
                    courseId: req.params.id,
                    userId: req.user._id,
                    price: course.price,
                })

                return HttpResponse.message(res, 'Đăng ký khóa học thành công')
            }

            throw new Error('Khóa học không tồn tại')

        } catch (err) {
            HttpResponse.error(res, err)
        }
    }
}


