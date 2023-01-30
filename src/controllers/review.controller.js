import Register from "../models/register"
import Review from '../models/review'
import HttpResponse from "../utils/HttpResponse"

export const ReviewController = {
    getReview: (req, res) => {
        const { type } = req.query
        return Review.findAndPaginate({
            courseId: req.params.id,
            ...req.query,
        })
    },
    newReview: async (req, res) => {
        const { star, content, tags } = req.body

        // Kiểm tra thông tin register
        const register = await Register.findOne({ course: req.params.id, user: req.user._id })

        if (!register) throw new Error('Đăng ký khóa học để tiến hành đánh giá')

        if (register.review) throw new Error('Bạn đã đánh giá khóa học này rồi, không thể đánh giá nữa')

        const review = await Review.create({
            star, content,
            courseId: register.course,
            registerId: register._id,
            user: req.user._id,
            tags
        })

        // Cập nhật lại thông tin review cho register
        register.review = review._id
        await register.save()

        return review
    },
    report: async (req, res) => {
        const { content } = req.body
        const { id } = req.params
        return Review.findByIdAndUpdate(id, {
            reportContent: content,
        }, { new: true })
    }
}