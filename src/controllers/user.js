import User from "../models/user.js"
import { HttpResponse } from "../utils/HttpResponse.js"

const UserController = {
    async getUser(req, res) {
        try {
            return {
                data: await User.find()
            }
        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    async getOneUser(req, res) {
        try {
            const { email } = req.params
            const user = await User.findByEmail(email)
            HttpResponse.data(res, user.toJSON({ virtuals: false }))
        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    async newUser(req, res) {
        try {
            const { username, name } = req.body

            const user = new User({ username, name })
            let result = await user.save()
            HttpResponse.data(res, result)
        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    async deleteUser(req, res) {
        const { email } = req.params
        try {
            HttpResponse.delete(res, await User.deleteOne({ username: email }))
        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    async updateUser(req, res) {
        try {
            const { name } = req.body
            const { email } = req.params
            HttpResponse.update(res, await User.updateOne({ username: email }, { name }))
        } catch (err) {
            HttpResponse.error(res, err)
        }
    }
}

export default UserController