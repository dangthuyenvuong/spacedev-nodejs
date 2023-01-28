import Register from "../models/register"
import Review from '../models/review'
import HttpResponse from "../utils/HttpResponse"

export const ReviewController = {
    getReview: (req, res) => {
        HttpResponse.data(res,
            Review.findAndPaginate({
                courseId: req.params.id,
                ...req.query
            })
        )
    },
    newReview: async (req, res) => {
        try {
            const { star, content } = req.body

            // Kiểm tra thông tin register
            const register = await Register.findOne({ course: req.params.id, user: req.user._id })

            if (!register) throw new Error('Đăng ký khóa học để tiến hành đánh giá')

            if (register.review) throw new Error('Bạn đã đánh giá khóa học này rồi, không thể đánh giá nữa')

            const review = await Review.create({
                star, content,
                courseId: register.course,
                registerId: register._id,
                user: req.user._id
            })

            // Cập nhật lại thông tin review cho register
            register.review = review._id
            await register.save()

            HttpResponse.data(res, review)
        } catch (err) {
            HttpResponse.error(res, err)
        }
    }
}