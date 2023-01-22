import md5 from "md5"
import User from "../models/user"
import { HttpResponse } from "../utils/HttpResponse"
import { ACCESS_TOKEN_EXPIRED, ACCESS_TOKEN_KEY, REFRESH_TOKEN_EXPIRED, REFRESH_TOKEN_KEY } from '../config'
import jwt from "jsonwebtoken"
export const AuthController = {
    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ username, password: md5(password) })
            if (!user) {
                return HttpResponse.error(res, undefined, 'Username hoặc password không đúng')
            }

            // generate accessToken
            const accessToken = jwt.sign({ _id: user._id }, ACCESS_TOKEN_KEY, { expiresIn: ACCESS_TOKEN_EXPIRED })
            const refreshToken = jwt.sign({ _id: user._id }, REFRESH_TOKEN_KEY, { expiresIn: REFRESH_TOKEN_EXPIRED })
            // generate refreshToken

            HttpResponse.data(res, { accessToken, refreshToken })

        } catch (err) {
            HttpResponse.error(res, err)
        }

    },
    refreshToken(req, res) {
        try {
            const { refreshToken } = req.body

            const payload = jwt.verify(refreshToken, REFRESH_TOKEN_KEY)
            // generate accessToken
            const accessToken = jwt.sign({ _id: payload._id }, ACCESS_TOKEN_KEY, { expiresIn: ACCESS_TOKEN_EXPIRED })
            // generate refreshToken

            HttpResponse.data(res, { accessToken, refreshToken })

        } catch (err) {
            HttpResponse.error(res, err)
        }
    }
}