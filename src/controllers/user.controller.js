import User from '../models/user'
import HttpResponse from '../utils/HttpResponse'

export const UserController = {
    getUser: async (req, res) => {
        try {
            const user = await User.findOne()
            HttpResponse.data(res, user)
        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    register: async (req, res) => {

        try {
            const { username, password, name } = req.body
            const user = await User.create({ username, password, name })
            HttpResponse.data(res, user)

        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    updateProfile: async (req, res) => {
        try {
            const user = await User.updateOne({ _id: req.params.id }, req.body)
            HttpResponse.update(res, user)
        } catch (err) {
            HttpResponse.error(res, err)
        }
    }
}