import md5 from "md5"
import User from "../models/user.js"
import { HttpResponse } from "../utils/HttpResponse.js"

const UserController = {
    async register(req, res) {
        try {
            const { username, password, name } = req.body

            const user = await User.create({ username, password: md5(password), name })
            HttpResponse.data(res, user)
        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    async getProfile(req, res) {
        try {
            HttpResponse.data(res, await User.findById(req.user._id))
        } catch (err) {
            HttpResponse.error(res, err)
        }
    },
    // async getOneUser(req, res) {
    //     try {
    //         const { email } = req.params
    //         const user = await User.findByEmail(email)
    //         HttpResponse.data(res, user.toJSON({ virtuals: false }))
    //     } catch (err) {
    //         HttpResponse.error(res, err)
    //     }
    // },
    // async newUser(req, res) {
    //     try {
    //         const { username, name } = req.body

    //         const user = new User({ username, name })
    //         let result = await user.save()
    //         HttpResponse.data(res, result)
    //     } catch (err) {
    //         HttpResponse.error(res, err)
    //     }
    // },
    // async deleteUser(req, res) {
    //     const { email } = req.params
    //     try {
    //         HttpResponse.delete(res, await User.deleteOne({ username: email }))
    //     } catch (err) {
    //         HttpResponse.error(res, err)
    //     }
    // },
    async updateUser(req, res) {
        try {
            const { name, avatar, gender, phone } = req.body
            const { email } = req.params
            HttpResponse.update(res, await User.updateOne({ username: email }, { name, avatar, gender, phone }))
        } catch (err) {
            HttpResponse.error(res, err)
        }
    }
}

export default UserController