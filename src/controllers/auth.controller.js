


import jwt from 'jsonwebtoken'
import md5 from "md5"
import { ACCESS_TOKEN_EXPIRED, ACCESS_TOKEN_KEY, REFRESH_TOKEN_EXPIRED, REFRESH_TOKEN_KEY } from "../constants/token"
import User from "../models/user"
import { createController } from "../utils/createController"

/**
 * Login:
 * 
 * B1: Kiểm tra xem thông tin username / password đúng hay chưa
 * B2: Sinh mã accessToken và refreshToken
 */


export const generateToken = (user) => {
    const payload = { _id: user._id }
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_KEY, { expiresIn: ACCESS_TOKEN_EXPIRED })
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_KEY, { expiresIn: REFRESH_TOKEN_EXPIRED })
    return { accessToken, refreshToken }
}

export const AuthController = createController({
    login: async (req, res) => {
        const { username, password } = req.body
        const user = await User.findOne({ username, password: md5(password), emailConfirm: true })
        if (user) {

            const token = generateToken(user)

            return token
        }

        throw new Error('Tài khoản hoặc mật khẩu không đúng')
    },
    loginByCode: async (req, res) => {
        const { code } = req.body
        const user = await User.findOne({
            codeConfirm: code
        })
        if (user) {
            user.codeConfirm = null
            user.confirmRedirect = null
            user.save()
            const token = generateToken(user)
            return token
        }

        throw new Error('Đã có lỗi xẩy ra')
    },
    refreshToken: async (req, res) => {
        try {
            const { refreshToken } = req.body
            const payload = jwt.verify(refreshToken, REFRESH_TOKEN_KEY)

            const newPayload = { _id: payload._id }
            const token = generateToken(newPayload)
            return token

        } catch (err) {
            throw new Error({
                name: 'TokenInvalid',
                message: 'Token Invalid',
            })
        }
    }
})

export default AuthController