import md5 from 'md5'
import User from '../models/user'
import HttpResponse from '../utils/HttpResponse'
import mail from '../utils/mail'
import fs from 'fs'
import { randomBytes } from 'crypto'


const mailTemplate = fs.readFileSync('resources/mail/register.html').toString()

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

            const codeConfirm = randomBytes(64).toString('hex')
            const urlConfirm = `${req.protocol}://${req.get('host')}/register-confirm/${codeConfirm}`

            mail({
                to: username,
                subject: 'Xác nhận đăng ký tài khoản spacedev.vn',
                content: mailTemplate.replace({}),
                data: {
                    urlConfirm,
                    username: username.toLowerCase(),
                    password: ''.padStart(password.length, '*'),
                }
            })
            await User.create({
                username,
                password: md5(password),
                name,
                codeConfirm,
                confirmRedirect: req.get('origin') + `/signin`
            })
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