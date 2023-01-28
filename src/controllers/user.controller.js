import md5 from 'md5'
import User from '../models/user'
import HttpResponse from '../utils/HttpResponse'

export const UserController = {
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.user._id)
            HttpResponse.data(res, user)
        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    register: async (req, res) => {

        try {
            const { username, password, name } = req.body
            await User.create({ username, password: md5(password), name })
            HttpResponse.message(res, 'Tạo tài khoản thành công')

        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    updateProfile: async (req, res) => {
        const { name, avatar, phone, gender, birthday } = req.body
        HttpResponse.data(res, User.findOneAndUpdate(
            { _id: req.user._id },
            { name, avatar, phone, gender, birthday }, { new: true }
        ))
    }
}